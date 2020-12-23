const express = require('express');
const verifyToken = require('../middlewares/authToken');
const router = express.Router()
const commentController = require('../controllers/commentController')

router.post('/', verifyToken, commentController.postComment);
router.get('/:postID', commentController.getCommentsByPost);
router.put('/', verifyToken, commentController.editComment)
router.delete('/:commentID', verifyToken, commentController.deleteComment)


module.exports = router