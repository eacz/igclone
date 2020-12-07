const Post = require('../models/Post');

module.exports.createPost = async (req, res) => {
    const { title, body, photo } = req.body;
    if (!title || !body) {
        return res.status(422).json({ msg: 'Missing information' });
    }
    try {
        const post = new Post({ title, body, photo, postedBy: req.user._id });
        await post.save();
        return res.json({ post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

module.exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('postedBy', '-password');
        return res.json({ posts });
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.message });
    }
};

module.exports.getUserPosts = async (req, res) => {
    const user = req.user;
    try {
        const posts = await Post.find({ postedBy: user });
        return res.json({ posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};
