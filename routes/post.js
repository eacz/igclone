const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middlewares/authToken');

router.post('/', verifyToken, postController.createPost);
router.get('/all', verifyToken, postController.getAllPosts);
router.get('/user', verifyToken, postController.getUserPosts);

module.exports = router;
