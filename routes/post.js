const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middlewares/authToken');

router.post('/', verifyToken, postController.createPost);
router.get('/all', verifyToken, postController.getAllPosts);
router.get('/user', verifyToken, postController.getUserPosts);
<<<<<<< HEAD
router.get('/:postID', postController.getOnePost)
=======
>>>>>>> 6e3053212844809575685e20c0a3a46dbddaec8c

module.exports = router;
