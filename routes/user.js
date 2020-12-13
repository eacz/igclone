const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/:userID', userController.getUserWithPosts)

module.exports = router;