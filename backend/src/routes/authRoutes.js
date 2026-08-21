const express = require('express');

const router = express.Router();

console.log('Auth Routes Loaded');

// Test Route
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Auth Route Working',
    });
});

const {
    registerUser,
    loginUser,
    checkUserData,
    sendOTP,
    verifyOTP,
    changePassword,
    resetPassword
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/checkUserData',checkUserData);
router.post('/send-otp',sendOTP);
router.post('/verify-otp',verifyOTP);
router.post('/change-password',changePassword);
router.post('/reset-password',resetPassword);



module.exports = router;

