const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    followers: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        default: []
    },
    following: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        default: [],
    }
});

module.exports = mongoose.model('User', userSchema);
