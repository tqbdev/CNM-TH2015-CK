const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../policies/Authenticated');
const {
  getTransactions,
  createTransaction,
  updateTransactionById,
  getTransactionById
} = require('../controllers/TransactionsController');

router.get('/', isAuthenticated, getTransactions);
router.post('/', isAuthenticated, createTransaction);
router.patch('/:transactionId', isAuthenticated, updateTransactionById);
router.get('/:transactionId', isAuthenticated, getTransactionById);

module.exports = router;
