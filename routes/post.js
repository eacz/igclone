const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middlewares/authToken');

router.post('/', verifyToken, postController.createPost);

module.exports = router;
