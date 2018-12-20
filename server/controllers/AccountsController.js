const _ = require('lodash')

const {
  Account,
  User
} = require('../models')

module.exports = {
  async getAccounts(req, res) {
    try {
      const user = req.user

      const accounts = await Account.findAll({
        where: {
          UserEmail: user.email
        }
      })

      if (!accounts) {
        return res.status(404).send({
          error: 'Not found account belong to user has email ' + user.email
        })
      }

      res.send(accounts)
    } catch (err) {
      res.status(500).send({
        error: 'Error in get accounts by user.'
      })
    }
  },

  async createAccount(req, res) {
    try {
      const {
        email
      } = req.body

      const user = await User.findByPk(email)
      if (!user) {
        return res.status(404).send({
          error: 'Not found user has email ' + email
        })
      }

      const newAccount = await Account.create({
        UserEmail: email
      })

      res.send({
        account: newAccount.toJSON()
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error in create a account by staff.'
      })
    }
  },

  async updateAccountById(req, res) {
    try {
      const {
        accountId
      } = req.params

      const {
        email,
        charge
      } = req.body

      const user = await User.findByPk(email)
      if (!user) {
        return res.status(404).send({
          error: 'Not found user has email ' + email
        })
      }

      const account = await Account.findOne({
        where: {
          UserEmail: email,
          id: accountId
        }
      })

      if (!account) {
        return res.status(404).send({
          error: 'Not found account has id ' + accountId + ' and belong to user has email ' + email
        })
      }
      const currentBalance = account.balance
      await account.update({
        balance: currentBalance + charge
      })

      res.send({
        account: account.toJSON()
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error in update a account.'
      })
    }
  },

  async closeAccountById(req, res) {
    try {
      const user = req.user
      const {
        accountId
      } = req.params

      const account = await Account.findOne({
        where: {
          UserEmail: user.email,
          id: accountId
        }
      })

      if (!account) {
        return res.status(404).send({
          error: 'Not found account has id ' + accountId
        })
      }
      const currentBalance = account.balance
      if (currentBalance > 0) {
        return res.status(405).send({
          error: 'The account has balance. Can\'t close'
        })
      }

      await account.update({
        isOpen: false
      })

      res.send({
        account: account.toJSON()
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error in update a account.'
      })
    }
  }
}
