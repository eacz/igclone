const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authToken');

router.post('/follow', verifyToken, userController.FollowUnfollow);
router.get('/post_saved', verifyToken, userController.getPostsSaved)
router.post('/save_post', verifyToken, userController.SavedUnsavedPost)
router.put('/', verifyToken, userController.updateUserInfo)
router.get('/search/:search', verifyToken, userController.searchUsers)
router.post('/list_details', userController.getListDetails)
router.get('/:userID', userController.getUserWithPosts)

module.exports = router;