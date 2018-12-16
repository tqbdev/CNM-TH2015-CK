const _ = require('lodash')

const {
  User
} = require('../models')

module.exports = {
  async getById(req, res) {
    try {
      const user = await User.findByPk(req.params.userId)

      if (!user) {
        return res.status(404).send({
          error: 'Not found user has id ' + req.params.userId
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error in get user by id.'
      })
    }
  }
}
