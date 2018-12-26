const express = require('express');
const router = express.Router();

const {
  isAuthenticated,
  isStaffAuthenticated
} = require('../policies/Authenticated');
const {
  getAccounts,
  createAccount,
  updateAccountById
} = require('../controllers/AccountsController');

router.get('/', isAuthenticated, getAccounts);
router.post('/', isStaffAuthenticated, createAccount);
router.patch('/:accountId', isAuthenticated, updateAccountById);

module.exports = router;
