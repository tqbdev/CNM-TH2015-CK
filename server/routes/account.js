const express = require('express')
const router = express.Router()

const {
  isUserAuthenticated,
  isStaffAuthenticated
} = require('../policies/Authenticated')
const {
  getAccounts,
  createAccount,
  updateAccountById,
  closeAccountById
} = require('../controllers/AccountsController')

router.get('/', isUserAuthenticated, getAccounts)
router.post('/', isStaffAuthenticated, createAccount)
router.put('/:accountId', isStaffAuthenticated, updateAccountById)
router.delete('/:accountId', isUserAuthenticated, closeAccountById)

module.exports = router
