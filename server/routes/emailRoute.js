const express = require('express');
const { sendEmailController } = require('../controller/emailController');

const router = express.Router();

// Route to send an email
router.post('/send-email', sendEmailController);

module.exports = router;
