const Comment = require('../models/Comment');
const Post = require('../models/Post');

module.exports.createPost = async (req, res) => {
    const { title, body, photo } = req.body;
    if (!title || !body || !photo) {
        console.log(photo);
        return res.status(422).json({ msg: 'Missing information' });
    }
    const created = new Date(Date.now());
    try {
        const post = new Post({
            title,
            body,
            photo,
            postedBy: req.user._id,
            created,
        });
        await post.save();
        return res.json({ post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

module.exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
            .populate('postedBy', '-password')
            .populate({
                path: 'comments',
                select: 'postedBy comment',
                model: Comment,
                populate: { path: 'postedBy', select: 'username photo' },
                limit: 2
            });
        return res.json({ posts });
    } catch (error) {
        res.status(500);
        console.log(error);
        return res.json({ msg: error.message });
    }
};

module.exports.getUserPosts = async (req, res) => {
    const user = req.user;
    try {
        const posts = await Post.find({ postedBy: user })
            .populate({
                path: 'comments',
                select: 'postedBy comment',
                model: Comment,
                populate: { path: 'postedBy', select: 'username photo' },
                limit: 2
            })
            .sort('-created');
        return res.json({ posts });
    } catch (error) {
        res.status(500);
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

module.exports.getOnePost = async (req, res) => {
    try {
        const { postID } = req.params;
        const post = await Post.findById(postID)
            .populate({ path: 'postedBy', select: 'username photo' })
            .populate({
                path: 'comments',
                select: 'postedBy comment',
                model: Comment,
                populate: { path: 'postedBy', select: 'username photo' },
                limit: 2
            });
        if (post) {
            return res.json({ post });
        }
        throw new Error("The post doesn't exists or have been deleted");
    } catch (error) {
        res.status(500);
        console.log(error);
        return res.json({ msg: error.message });
    }
};

module.exports.getFollowingPosts = async (req, res) => {
    const user = req.user;
    const { following } = user;
    try {
        const posts = await Post.find({ postedBy: following })
            .sort('-created')
            .limit(50)
            .populate('postedBy', 'photo username')
            .populate({
                path: 'comments',
                select: 'postedBy comment',
                model: Comment,
                populate: { path: 'postedBy', select: 'username photo' },
                limit: 2,
            });
        return res.json({ posts });
    } catch (error) {
        res.status(404);
        console.log(error);
        return res.json({ msg: error.message });
    }
};

module.exports.likeDislike = async (req, res) => {
    const user = req.user;
    const { postID } = req.params;
    try {
        const post = await Post.findById(postID);
        post.likes.includes(user._id)
            ? (post.likes = post.likes.filter((id) =>
                  id.toString() === user._id.toString() ? null : id
              ))
            : post.likes.push(user._id);
        await post.save();
        return res.json({ msg: 'Success', post });
    } catch (error) {
        console.log(error);
        res.status(500);
        return res.json({ msg: error.message });
    }
};
