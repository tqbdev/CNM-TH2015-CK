const express = require('express');
const router = express.Router();

const {
  isAuthenticated,
  isStaffAuthenticated
} = require('../policies/Authenticated');
const {
  getAccounts,
  createAccount,
  updateAccountById,
  getAccountById
} = require('../controllers/AccountsController');

router.get('/', isAuthenticated, getAccounts);
router.post('/', isStaffAuthenticated, createAccount);
router.patch('/:accountId', isAuthenticated, updateAccountById);
router.get('/:accountId', isAuthenticated, getAccountById);

module.exports = router;
