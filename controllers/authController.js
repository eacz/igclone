const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_KEY);

exports.SignUp = async (req, res) => {
    const { name, email, password, photo, username } = req.body;
    if (!email || !name || !password || !username) {
        return res
            .status(422)
            .json({ error: 'You have to fill all the fields' });
    }
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(401).json({ msg: 'User already exists' });
        }
        user = await User.findOne({ username: username });
        if (user) {
            return res
                .status(401)
                .json({ msg: 'That username is not avalaible' });
        }
        user = new User({
            email,
            name,
            photo,
            username,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const msg = {
            to: email, // Change to your recipient
            from: 'zuzu620@hotmail.com', // Change to your verified sender
            subject: 'Signup succesfully',
            text: 'Welcome to ig-clone',
            html: '<h1>Thank you for try mi instagram clone</h1> <p>-eacz</p>',
        };
        sgMail
            .send(msg)
            .then(() => console.log('Mail sended'))
            .catch(() => console.log(error));

        return res.json({ msg: 'user created' });
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
                const token = jwt.sign(
                    { _id: user._id },
                    process.env.SECRET_KEY,
                    { expiresIn: 14400 }
                );
                user.password = undefined;
                return res.json({ msg: 'Successfully Login', token, user });
            }
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        return res.status(404).json({ msg: "The user doesn't exists" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};
