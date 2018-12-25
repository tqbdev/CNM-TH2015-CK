const express = require('express');
const router = express.Router();

const {
  isAuthenticated
} = require('../policies/Authenticated');
const {
  getTransactions,
  createTransaction,
  updateTransactionById
} = require('../controllers/TransactionsController');

router.get('/', isAuthenticated, getTransactions);
router.post('/', isAuthenticated, createTransaction);
router.patch('/:transactionId', isAuthenticated, updateTransactionById);

module.exports = router;
