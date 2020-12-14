const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authToken');

router.get('/:userID', userController.getUserWithPosts)
router.post('/follow', verifyToken, userController.FollowUnfollow);
router.put('/', verifyToken, userController.updateUserInfo)

module.exports = router;