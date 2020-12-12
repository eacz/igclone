const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if (!token) {
        return res.status(404).json({ msg: 'missing token' });
    }
    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(_id).select('-password');
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: error.message });
    }
};

module.exports = verifyToken;
