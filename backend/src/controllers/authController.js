const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const client = require('../config/twilio');

// Register User
const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            phoneNumber,
            password,
            checked,
            userName,
        } = req.body;

        // Validation
        if (
            !name ||
            !email ||
            !phoneNumber ||
            !password ||
            !userName
        ) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Terms Validation
        if (!checked) {
            return res.status(400).json({
                success: false,
                message: 'Please accept Terms & Conditions',
            });
        }

        // Check Existing User
        const existingUser = await User.findOne({
            $or: [
                { email },
                { phoneNumber },
                { userName },
            ],
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message:
                    'Email, Phone Number or Username already exists',
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Create User
        const user = await User.create({
            name,
            email,
            phoneNumber,
            password: hashedPassword,
            userName,
        });

        // Generate Token
        const token = generateToken(user._id);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                userName: user.userName,
            },
        });
    } catch (error) {
        console.error('Register Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and Password are required',
            });
        }

        // Find User
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Password',
            });
        }

        // Generate Token
        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: 'Login Successful',
            token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                userName: user.userName,
            },
        });
    } catch (error) {
        console.error('Login Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
// check User
const checkUserData = async (req,res)=>{
    try{
        const  {email,phoneNumber,userName} = req.body

         if (!email || !phoneNumber || !userName) {
            return res.status(400).json({
                success: false,
                message: 'Email, Phone Number and Username are required',
            });
        }
        const existingUser = await User.findOne({
            $or:[
                {phoneNumber},
                {email},
                {userName}
            ]
        })

        if(existingUser){
            return res.status(400).json({
                success:false,
                message: 'Email, Phone Number or Username already exists',
            })
        }
        return res.status(200).json({
            success:true,
            message:'User Details Checked User Can proceed'
        })
    } catch (error) {
          console.error('Register Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
// forget password
const sendOTP = async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({
                success: false,
                message: 'Phone Number is required',
                
            });
        }

        const response =
            await client.verify.v2
                .services(process.env.TWILIO_VERIFY_SID)
                .verifications.create({
                    to: phoneNumber,
                    channel: 'sms',
                });

        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            status: response.status,
             otp: '123456',
        });
    } catch (error) {
        console.error('Send OTP Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to send OTP',
        });
    }
};


const verifyOTP = async (req, res) => {
    try {
        const { otp } = req.body;

        if (otp !== '123456') {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'OTP Verified Successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Verification Failed',
        });
    }
};
module.exports = {
    registerUser,
    loginUser,
    checkUserData,
    sendOTP,
    verifyOTP,
};