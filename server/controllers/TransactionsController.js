const _ = require('lodash');

const {
  Transaction,
  User
} = require('../models');

module.exports = {
  async getTransactions(req, res) {
    try {
      const {
        descending,
        sortBy,
        rowsPerPage,
        page
      } = JSON.parse(
        req.query.pagination
      );
      const user = req.user;

      let params = {
        where: {
          UserEmail: user.email
        }
      };

      if (+rowsPerPage > 0) {
        params.limit = +rowsPerPage;
        params.offset = (+page - 1) * +rowsPerPage;
      }

      if (sortBy) {
        params.order = [
          [sortBy, descending ? 'DESC' : 'ASC']
        ];
      }

      const transactions = await Transaction.findAll(params);

      if (!transactions) {
        return res.status(404).send({
          error: 'Not found transactions belong to user has email ' + user.email
        });
      }

      res.send(transactions);
    } catch (err) {
      res.status(500).send({
        error: 'Error in get transactions by user.'
      });
    }
  },

  async createTransaction(req, res) { // TODO: Rewrite createTransaction
    try {
      const {
        email
      } = req.body;

      const user = await User.findByPk(email);
      if (!user) {
        return res.status(405).send({
          error: 'Not found user has email ' + email
        });
      }

      const newTransaction = await Transaction.create({
        UserEmail: email
      });

      res.send({
        transaction: newTransaction.toJSON()
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error in create a transaction by staff.'
      });
    }
  },

  async updateTransactionById(req, res) { // TODO: Rewrite updateTransactionById - Check confirm CODE -> Done transaction || Resend code || Check timeout
    try {
      const user = req.user;
      const {
        transactionId
      } = req.params;
      const {
        attributes
      } = req.body;

      const transaction = await Transaction.findOne({
        where: {
          UserEmail: user.email,
          id: transactionId
        }
      });

      if (!transaction) {
        return res.status(404).send({
          error: 'Not found transaction has id ' + transactionId
        });
      }

      if (attributes.isOpen === undefined) {
        return res.status(406).send({
          error: 'Not accepted. Required an attribute "isOpen"'
        });
      }

      if (attributes.isOpen === false) {
        const currentBalance = transaction.balance;
        if (currentBalance > 0) {
          return res.status(405).send({
            error: "The transaction has balance. Can't close"
          });
        }

        await transaction.update({
          isOpen: false
        });

        res.send({
          transaction: transaction.toJSON()
        });
      } else {
        return res.status(406).send({
          error: "Not accepted. Can't reopen a closed transaction"
        });
      }
    } catch (err) {
      res.status(500).send({
        error: 'Error in update a transaction'
      });
    }
  }
};
