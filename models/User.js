const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
<<<<<<< HEAD
    username: {
        type: String,
        required: true,
    },
=======
>>>>>>> 6e3053212844809575685e20c0a3a46dbddaec8c
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
<<<<<<< HEAD
    },
    photo: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        defaut: '',
    }

=======
    }
>>>>>>> 6e3053212844809575685e20c0a3a46dbddaec8c
})

module.exports = mongoose.model('User', userSchema)