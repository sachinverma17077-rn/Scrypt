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
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/checkUserData',checkUserData);
router.post('/send-otp',sendOTP);
router.post('/verify-otp',verifyOTP);


module.exports = router;

