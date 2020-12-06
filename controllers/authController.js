const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
