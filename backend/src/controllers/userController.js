const User = require('../models/User');

const searchUsers = async (req, res) => {
    try {
        const { search } = req.query;

        if (!search || search.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Search text is required',
            });
        }

        const users = await User.find({
            userName: {
                $regex: search.trim(),
                $options: 'i',
            },

            _id: {
                $ne: req.user._id,
            },
        })
            .select(
                '_id name userName profilePicture isOnline'
            )
            .limit(20);

        return res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error('Search Users Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

module.exports = {
    searchUsers,
};