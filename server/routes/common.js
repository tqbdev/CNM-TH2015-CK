const express = require('express');
const router = express.Router();

const {
  isAuthenticated,
  isStaffAuthenticated
} = require('../policies/Authenticated');
const {
  userRegister,
  userLogin,
  userToken,
  userRevokeToken
} = require('../controllers/AuthenticationController')

// Authentication route
router.post('/register', isStaffAuthenticated, userRegister)
router.post('/login', userLogin)
router.post('/token', userToken)
router.delete('/token', userRevokeToken)

module.exports = router;
