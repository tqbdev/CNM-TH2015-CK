const _ = require('lodash');

const {
  Account,
  User
} = require('../models');

module.exports = {
  async getAccounts(req, res) {
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

      const accounts = await Account.findAll(params);

      if (!accounts) {
        return res.status(404).send({
          error: 'Not found accounts belong to user has email ' + user.email
        });
      }

      res.send(accounts);
    } catch (err) {
      res.status(500).send({
        error: 'Error in get accounts by user.'
      });
    }
  },

  async createAccount(req, res) {
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
      const {
        accountId
      } = req.params;
      const {
        attributes
      } = req.body;

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

      if (attributes.isOpen === false) {
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
