const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
<<<<<<< HEAD
        default:
            'https://res.cloudinary.com/dbyrp5tgh/image/upload/v1607632799/igclone/defaultuser_llqwsw.jpg',
=======
        default: 'no photo',
>>>>>>> 6e3053212844809575685e20c0a3a46dbddaec8c
    },
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
<<<<<<< HEAD
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    likes: {
        type: Number,
        default: 0,
    },
=======
    }
>>>>>>> 6e3053212844809575685e20c0a3a46dbddaec8c
});

module.exports = mongoose.model('Post', postSchema);
