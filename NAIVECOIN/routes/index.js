var express = require('express');
var router = express.Router();
const { check } = require('express-validator/check')

const Naivecoin = require('../middleware/naivecoin')

const responseMiddleware = (req, res, next) => {
  return res.json(req.responseValue)
}
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Naive Coin' })
})

router.post('/transactions/new', [
  check('sender', 'Sender must be a String').exists(),
  check('recipient', 'Sender must be a String').exists(),
  check('amount', 'Sender must be a Int Value').isInt().exists()
], Naivecoin.newTransaction, responseMiddleware)

router.get('/mine', Naivecoin.mine, responseMiddleware)

router.get('/chain', Naivecoin.getChain, responseMiddleware)

router.post('/node/register', [
  check('node', 'Node must be a String').exists()
], Naivecoin.addNode, responseMiddleware)

module.exports = router
