const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authToken');

router.post('/follow', verifyToken, userController.FollowUnfollow);
router.put('/', verifyToken, userController.updateUserInfo)
router.post('/list_details', userController.getListDetails)
router.get('/:userID', userController.getUserWithPosts)

module.exports = router;