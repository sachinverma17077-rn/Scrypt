const express = require('express');

const router = express.Router();

const {
    sendInvitation,
    getInvitations,
} = require('../controllers/invitationController');

const protect = require('../middleware/authMiddleware');

router.post(
    '/send',
    protect,
    sendInvitation
);
router.get(
    '/',
    protect,
    getInvitations
);

module.exports = router;