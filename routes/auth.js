const express = require('express');
const authRouter = express.Router();
const User = require('../models/User');

authRouter.get('/', (req, res) => {
    res.send('hello');
});

authRouter.post('/signup', async (req, res) => {
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
            password,
        });
        await user.save();
        res.json({ msg: 'user created' });

        return res.json({ res: req.body });
    } catch (error) {
        console.log(error);
       return res.status(500).json({msg: error.message})
    }
});

module.exports = authRouter;
