const Invitation = require('../models/Invitation');
const User = require('../models/User');

const sendInvitation = async (req, res) => {
    try {
        const { receiverId } = req.body;

        const senderId = req.user._id;

        if (!receiverId) {
            return res.status(400).json({
                success: false,
                message: 'Receiver ID is required',
            });
        }

        // Don't allow sending invitation to yourself
        if (
            senderId.toString() === receiverId.toString()
        ) {
            return res.status(400).json({
                success: false,
                message: 'You cannot invite yourself',
            });
        }

        // Check receiver exists
        const receiver = await User.findById(receiverId);

        if (!receiver) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Check existing invitation
        const existingInvitation =
            await Invitation.findOne({
                $or: [
                    {
                        sender: senderId,
                        receiver: receiverId,
                    },
                    {
                        sender: receiverId,
                        receiver: senderId,
                    },
                ],
            });

        if (existingInvitation) {
            return res.status(400).json({
                success: false,
                message:
                    'Invitation already exists',
            });
        }

        // Create invitation
        const invitation =
            await Invitation.create({
                sender: senderId,
                receiver: receiverId,
            });

        const populatedInvitation =
            await invitation.populate([
                {
                    path: 'sender',
                    select:
                        '_id name userName profilePicture',
                },
                {
                    path: 'receiver',
                    select:
                        '_id name userName profilePicture',
                },
            ]);

        return res.status(201).json({
            success: true,
            message: 'Invitation sent successfully',
            data: populatedInvitation,
        });
    } catch (error) {
        console.error(
            'Send Invitation Error:',
            error
        );

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};




const getInvitations = async (req, res) => {
    try {
        const invitations =
            await Invitation.find({
                receiver: req.user._id,
                status: 'pending',
            })
                .populate(
                    'sender',
                    '_id name userName profilePicture isOnline'
                )
                .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: invitations,
        });
    } catch (error) {
        console.error(
            'Get Invitations Error:',
            error
        );

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

module.exports = {
    sendInvitation,
    getInvitations,
};