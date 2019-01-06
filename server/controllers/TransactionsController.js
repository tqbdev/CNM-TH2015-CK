const _ = require('lodash');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Transaction, User, Account } = require('../models');
const MailService = require('../services/mail');

module.exports = {
  async getTransactionById(req, res) {
    try {
      const user = req.user;
      const { transactionId } = req.params;

      let transaction = (await Transaction.findOne({
        where: {
          id: transactionId,
          isDone: false
        }
      })).toJSON();

      if (!transaction) {
        return res.status(404).send({
          error: 'Not found transaction has id ' + transactionId
        });
      }

      const senderAccount = await Account.findByPk(transaction.senderAccountId);
      if (senderAccount.UserEmail !== user.email) {
        return res.status(404).send({
          error: 'Not found transaction has id ' + transactionId
        });
      }

      delete transaction.codeVerify;

      res.send({
        transaction
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error in get transaction by id'
      });
    }
  },

  async getTransactions(req, res) {
    try {
      let pagination = null;
      if (req.query.pagination) {
        pagination = JSON.parse(req.query.pagination);
      } else {
        pagination = {
          descending: false,
          sortBy: null,
          rowsPerPage: 5,
          page: 1
        };
      }
      const { descending, sortBy, rowsPerPage, page } = pagination;

      const user = req.user;

      const userAccountIds = await Account.findAll({
        attributes: ['id'],
        where: {
          UserEmail: user.email
        }
      }).map(account => account.toJSON().id);
      console.log(userAccountIds);

      let params = {
        where: {
          [Op.or]: [
            {
              senderAccountId: {
                [Op.or]: userAccountIds
              }
            },
            {
              receiverAccountId: {
                [Op.or]: userAccountIds
              }
            }
          ]
        }
      };

      // let params = {
      //   include: [
      //     {
      //       model: Account,
      //       as: 'senderAccount',
      //       where: {
      //         UserEmail: user.email
      //       },
      //       required: false
      //     },
      //     {
      //       model: Account,
      //       as: 'receiverAccount',
      //       where: {
      //         UserEmail: user.email
      //       },
      //       required: false
      //     }
      //   ]
      // };

      const totalTransactions = await Transaction.count(params);
      let totalPages = 1;

      if (+rowsPerPage > 0) {
        params.limit = +rowsPerPage;
        params.offset = (+page - 1) * +rowsPerPage;
        totalPages = Math.ceil(totalTransactions / +rowsPerPage);
      }

      if (sortBy) {
        params.order = [[sortBy, descending ? 'DESC' : 'ASC']];
      }

      const transactions = await Transaction.findAll(params).map(transaction =>
        transaction.toJSON()
      );

      if (!transactions) {
        return res.status(404).send({
          error: 'Not found transactions belong to user has email ' + user.email
        });
      }

      _.map(transactions, transaction => {
        delete transaction.codeVerify;
        if (_.includes(userAccountIds, transaction.senderAccountId)) {
          transaction.senderAccount = true;
        } else {
          transaction.senderAccount = false;
        }

        if (_.includes(userAccountIds, transaction.receiverAccountId)) {
          transaction.receiverAccount = true;
        } else {
          transaction.receiverAccount = false;
        }
      });

      res.send({
        transactions,
        totalTransactions,
        totalPages
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'Error in get transactions by user.'
      });
    }
  },

  async createTransaction(req, res) {
    try {
      const user = req.user;

      if (user.isStaff) {
        const { receiverAccountId, amount, receiverEmail } = req.body;

        const receiverAccount = await Account.findOne({
          where: {
            id: receiverAccountId,
            UserEmail: receiverEmail
          }
        });

        if (!receiverAccount) {
          return res.status(404).send({
            error:
              'Not found receiver account has id ' +
              receiverAccountId +
              ' belongs to user has email ' +
              receiverEmail
          });
        }

        if (isNaN(amount) || +amount <= 0) {
          return res.status(406).send({
            error: 'Not accepted. Amount is uncorrect'
          });
        }

        await Transaction.create({
          receiverAccountId,
          amount,
          message: 'Admin charge money to your account',
          isDone: true
        });

        const currentBalance = receiverAccount.balance;
        await receiverAccount.update({
          balance: currentBalance + +amount
        });

        res.send();
      } else {
        const { senderAccountId, receiverAccountId, amount } = req.body;

        const senderAccount = await Account.findOne({
          where: {
            UserEmail: user.email,
            id: senderAccountId
          }
        });

        if (!senderAccount) {
          return res.status(404).send({
            error:
              'Not found sender account belong to user has id ' +
              senderAccountId
          });
        }

        const receiverAccount = await Account.findByPk(receiverAccountId);

        if (!receiverAccount) {
          return res.status(404).send({
            error: 'Not found receiver account has id ' + receiverAccountId
          });
        }

        if (isNaN(amount) || +amount <= 0) {
          return res.status(406).send({
            error: 'Not accepted. Amount is uncorrect'
          });
        }

        if (senderAccount.balance < +amount) {
          return res.status(406).send({
            error: `Not accepted. Sender account doesn't have enough money`
          });
        }

        let newTransaction = (await Transaction.create(req.body)).toJSON();

        // Send OTP to user email
        MailService.sendTranferCode(user, newTransaction.codeVerify);

        delete newTransaction.codeVerify;

        res.send({
          transaction: newTransaction
        });
      }
    } catch (err) {
      res.status(500).send({
        error: 'Error in create a transaction.'
      });
    }
  },

  async updateTransactionById(req, res) {
    try {
      const user = req.user;
      const { transactionId } = req.params;
      const { attributes } = req.body;

      const transaction = await Transaction.findOne({
        where: {
          id: transactionId,
          isDone: false
        }
      });

      if (!transaction) {
        return res.status(404).send({
          error: 'Not found transaction has id ' + transactionId
        });
      }

      const senderAccount = await Account.findByPk(transaction.senderAccountId);
      if (senderAccount.UserEmail !== user.email) {
        return res.status(404).send({
          error: 'Not found transaction has id ' + transactionId
        });
      }

      if (attributes.codeVerify === undefined) {
        return res.status(406).send({
          error: 'Not accepted. Required an attribute "codeVerify"'
        });
      }

      const codeVerify = attributes.codeVerify;
      delete attributes.codeVerify;
      if (!_.isEmpty(attributes)) {
        return res.status(406).send({
          error: 'Not accepted. We accepted only an attribute "name"'
        });
      }

      const isCodeValid = await transaction.compareCode(codeVerify);
      if (!isCodeValid) {
        return res.status(406).send({
          error: 'Not accepted. Code verify was incorrect'
        });
      }

      const receiverAccount = await Account.findByPk(
        transaction.receiverAccountId
      );
      const currentReceiverBalance = receiverAccount.balance;
      const currentSenderBalance = senderAccount.balance;
      await senderAccount.update({
        balance: currentSenderBalance - transaction.amount
      });
      await receiverAccount.update({
        balance: currentReceiverBalance + transaction.amount
      });
      await transaction.update({
        isDone: true
      });
      res.send();
    } catch (err) {
      res.status(500).send({
        error: 'Error in update a transaction'
      });
    }
  }
};
