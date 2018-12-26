const express = require('express');
const router = express.Router();

const {
  isAuthenticated
} = require('../policies/Authenticated');
const {
  getReceivers,
  createReceiver,
  updateReceiverById,
  deleteReceiverById
} = require('../controllers/ReceiversController');

router.get('/', isAuthenticated, getReceivers);
router.post('/', isAuthenticated, createReceiver);
router.patch('/:receiverId', isAuthenticated, updateReceiverById);
router.delete('/:receiverId', isAuthenticated, deleteReceiverById);

module.exports = router;
