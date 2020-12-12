const Post = require('../models/Post');

module.exports.createPost = async (req, res) => {
    const { title, body, photo } = req.body;
<<<<<<< HEAD
    if (!title || !body || !photo) {
        console.log(photo);
        return res.status(422).json({ msg: 'Missing information' });
    }
    const created = new Date(Date.now());
    try {
        const post = new Post({ title, body, photo, postedBy: req.user._id , created});
=======
    if (!title || !body) {
        return res.status(422).json({ msg: 'Missing information' });
    }
    try {
        const post = new Post({ title, body, photo, postedBy: req.user._id });
>>>>>>> 6e3053212844809575685e20c0a3a46dbddaec8c
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
<<<<<<< HEAD
    console.log(user);
=======
>>>>>>> 6e3053212844809575685e20c0a3a46dbddaec8c
    try {
        const posts = await Post.find({ postedBy: user });
        return res.json({ posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};
<<<<<<< HEAD

module.exports.getOnePost = async (req, res) => {
    try {
        const { postID } = req.params;
        const post = await Post.findById(postID).populate('postedBy', 'username photo')
        if (post) {
            return res.json({ post });
        }
        throw new Error("The post doesn't exists or have been deleted");
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.message });
    }
};
=======
>>>>>>> 6e3053212844809575685e20c0a3a46dbddaec8c
