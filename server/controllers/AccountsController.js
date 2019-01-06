const _ = require('lodash');

const { Account, User } = require('../models');

module.exports = {
  async getAccountById(req, res) {
    try {
      const user = req.user;
      const { accountId } = req.params;

      const account = await Account.findOne({
        where: {
          UserEmail: user.email,
          id: accountId
        }
      });

      if (!account) {
        return res.status(404).send({
          error: 'Not found account has id ' + accountId
        });
      }

      res.send({
        account: account.toJSON()
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error in get account by id'
      });
    }
  },

  async getAccounts(req, res) {
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

      let params = {
        where: {
          UserEmail: user.email
        }
      };

      const totalAccounts = await Account.count(params);
      let totalPages = 1;

      if (+rowsPerPage > 0) {
        params.limit = +rowsPerPage;
        params.offset = (+page - 1) * +rowsPerPage;
        totalPages = Math.ceil(totalAccounts / +rowsPerPage);
      }

      if (sortBy) {
        params.order = [[sortBy, descending ? 'DESC' : 'ASC']];
      }

      const accounts = await Account.findAll(params);

      if (!accounts) {
        return res.status(404).send({
          error: 'Not found accounts belong to user has email ' + user.email
        });
      }

      res.send({
        accounts,
        totalAccounts,
        totalPages
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error in get accounts by user.'
      });
    }
  },

  async createAccount(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findByPk(email);
      if (!user) {
        return res.status(405).send({
          error: 'Not found user has email ' + email
        });
      }

      const newAccount = await Account.create({
        UserEmail: email
      });

      res.send({
        account: newAccount.toJSON()
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error in create a account by staff.'
      });
    }
  },

  async updateAccountById(req, res) {
    try {
      const user = req.user;
      const { accountId } = req.params;
      const { attributes } = req.body;

      const account = await Account.findOne({
        where: {
          UserEmail: user.email,
          id: accountId
        }
      });

      if (!account) {
        return res.status(404).send({
          error: 'Not found account has id ' + accountId
        });
      }

      if (attributes.isOpen === undefined) {
        return res.status(406).send({
          error: 'Not accepted. Required an attribute "isOpen"'
        });
      }

      const isOpen = attributes.isOpen;
      delete attributes.isOpen;
      if (!_.isEmpty(attributes)) {
        return res.status(406).send({
          error: 'Not accepted. We accepted only an attribute "isOpen"'
        });
      }

      if (isOpen === false) {
        const counts = await Account.count({
          where: {
            UserEmail: user.email,
            isOpen: true
          }
        });
        if (counts <= 1) {
          return res.status(406).send({
            error: `Not accepted. You can't close the last account`
          });
        }

        const currentBalance = account.balance;
        if (currentBalance > 0) {
          return res.status(405).send({
            error: "The account has balance. Can't close"
          });
        }

        await account.update({
          isOpen: false
        });

        res.send({
          account: account.toJSON()
        });
      } else {
        return res.status(406).send({
          error: "Not accepted. Can't reopen a closed account"
        });
      }
    } catch (err) {
      res.status(500).send({
        error: 'Error in update a account'
      });
    }
  }
};
