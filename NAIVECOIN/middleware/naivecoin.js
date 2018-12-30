const Blockchain = require('./blockchain')
const { validationResult } = require('express-validator/check')

class Naivecoin {
  constructor () {
    this.blockchain = new Blockchain()
    this.getChain = this.getChain.bind(this)
    this.addNode = this.addNode.bind(this)
    this.mine = this.mine.bind(this)
    this.newTransaction = this.newTransaction.bind(this)
  }
  getChain (req, res, next) {
    req.responseValue = {
      message: 'Get Chain',
      chain: this.blockchain.chain
    }
    return next()
  }
}

module.exports = new Chiccocoin()
