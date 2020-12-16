const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middlewares/authToken');

router.post('/', verifyToken, postController.createPost);
router.get('/all', verifyToken, postController.getAllPosts);
router.get('/user', verifyToken, postController.getUserPosts);
router.get('/following', verifyToken, postController.getFollowingPosts);
router.post('/like/:postID', verifyToken, postController.likeDislike)
router.get('/:postID', postController.getOnePost);

module.exports = router;
