const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.postComment = async (req, res) => {
    const user = req.user;
    console.log(user);
    const { postID, comment } = req.body;

    if (!comment || !postID) {
        return res.status(422).json({ msg: 'Missing information' });
    }

    try {
        const post = await Post.findById(postID);
        if (!post) {
            return res
                .status(404)
                .json({
                    msg: "The post that you want to comment in doesn't exists",
                });
        }
        const newComment = new Comment({
            post: postID,
            comment,
            postedBy: user._id,
            created: new Date(Date.now()),
        });
        await newComment.save();
        post.comments.push(newComment._id);
        await post.save();
        const userData = {_id: user._id, username: user.username, photo: user.photo}
        return res.json({ msg: 'Comment added successfully', newComment, userData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

exports.editComment = async (req, res) => {
    const user = req.user;
    const {comment, commentID} = req.body
    
    try {
        const commentToModify = await Comment.findById(commentID);
        if(commentToModify.postedBy.toString() !== user._id.toString()){
            return res.status(401).json({msg: "You're not allowed to modify this comment"});
        }
        commentToModify.comment = comment;
        await commentToModify.save();
        return res.json({msg: 'Comment edited successfully', comment: commentToModify})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error.message})
    }
}

exports.getCommentsByPost = async (req, res) => {
    const { postID } = req.params;
    try {
        const comments = await Comment.find({ post: postID }).populate('postedBy', 'photo username').sort('-created')

        return res.json({ comments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};
