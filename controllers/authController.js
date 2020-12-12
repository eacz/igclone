const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.SignUp = async (req, res) => {
<<<<<<< HEAD
    const { name, email, password,photo, username } = req.body;
    if (!email || !name || !password || !username) {
=======
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
>>>>>>> 6e3053212844809575685e20c0a3a46dbddaec8c
        return res
            .status(422)
            .json({ error: 'You have to fill all the fields' });
    }
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(401).json({ msg: 'User already exists' });
        }
        user = new User({
            email,
            name,
<<<<<<< HEAD
            photo,
            username
=======
>>>>>>> 6e3053212844809575685e20c0a3a46dbddaec8c
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.json({ msg: 'user created' });

        return res.json({ res: req.body });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

exports.SignIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ msg: 'Missing info' });
    }

    try {
        const user = await User.findOne({ email });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({_id:user._id}, process.env.SECRET_KEY, {expiresIn: 14400});
<<<<<<< HEAD
                user.password = undefined;
                return res.json({ msg: 'Successfully Login', token, user});
=======
                return res.json({ msg: 'Authenticated', token });
>>>>>>> 6e3053212844809575685e20c0a3a46dbddaec8c
            }
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        return res.status(404).json({ msg: "The user doesn't exists" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};
