const express = require('express');
const router = express.Router();

const {
  userLogin,
  userToken,
  userRevokeToken
} = require('../controllers/AuthenticationController')

// Authentication route
router.post('/login', userLogin)
router.post('/token', userToken)
router.delete('/token', userRevokeToken)

module.exports = router;
