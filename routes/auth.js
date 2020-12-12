const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

authRouter.post('/signup', authController.SignUp);

authRouter.post('/signin', authController.SignIn);

module.exports = authRouter;
