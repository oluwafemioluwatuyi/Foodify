const express = require('express');
const { Register, Login, verifyEmail, forgotPassword, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/register', Register);
router.post('/forgotPassword',forgotPassword )
router.post('/resetPassword',resetPassword )
router.post('/login', Login);
router.get('/verify-email', verifyEmail);

module.exports = router;


