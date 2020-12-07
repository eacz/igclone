const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.SignUp = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
        return res
            .status(422)
            .json({ error: 'You have to fill all the fields' });
    }
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(401).json({ error: 'User already exists' });
        }
        user = new User({
            email,
            name,
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
                return res.json({ msg: 'Authenticated', token });
            }
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        return res.status(404).json({ msg: "The user doesn't exists" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};
