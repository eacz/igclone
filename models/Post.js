const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        default: '',
    },
    body: {
        type: String,
        default: '',
    },
    photo: {
        type: String,
        default:
            'https://res.cloudinary.com/dbyrp5tgh/image/upload/v1607632799/igclone/defaultuser_llqwsw.jpg',
    },
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    comments: {
        type: [mongoose.Types.ObjectId],
        ref: 'Comment',
        default: [],
    },
});

module.exports = mongoose.model('Post', postSchema);
