const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Comment', CommentSchema)