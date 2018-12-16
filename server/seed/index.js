const {
  sequelize,
  User,
  Account
} = require('../models')

const Promise = require('bluebird')
const users = require('./users.json')
const accounts = require('./accounts.json')

sequelize
  .sync({
    force: true
  })
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )

    await Promise.all(
      accounts.map(account => {
        Account.create(account)
      })
    )
  })
