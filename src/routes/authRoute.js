const express = require('express');
const { Register, Login, verifyEmail } = require('../controllers/authController');

const router = express.Router();

router.post('/register', Register);

// Route for user login
router.post('/login', Login);

// Route for email verification
router.post('/verify-email', verifyEmail);

module.exports = router;


