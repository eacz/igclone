const Post = require('../models/Post');
const User = require('../models/User');

module.exports.getUserWithPosts = async (req, res) => {
    const { userID } = req.params;

    try {
        const user = await User.findById(userID);
        if (!user) {
            throw new Error("This user doesn't exists");
        }
        const posts = await Post.find({ postedBy: user._id });
        return res.json({user, posts})
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message})
    }
};
