const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

authRouter.post('/signup', authController.SignUp);

module.exports = authRouter;
