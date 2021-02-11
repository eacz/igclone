const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

module.exports.getUserWithPosts = async (req, res) => {
    const { userID } = req.params;

    try {
        const user = await User.findById(userID);
        if (!user) {
            throw new Error("This user doesn't exists");
        }
        const posts = await Post.find({ postedBy: user._id })
            .populate({
                path: 'comments',
                select: 'postedBy comment',
                model: Comment,
                populate: { path: 'postedBy', select: 'username photo' },
            })
            .sort('-created');
        return res.json({ user, posts });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error.message });
    }
};

module.exports.updateUserInfo = async (req, res) => {
    const { _id } = req.user;
    const { description, name, photo } = req.body;

    try {
        if (!description && !name && !photo) {
            throw new Error('Missing data');
        }

        const user = await User.findById(_id);
        description ? (user.description = description) : null;
        name ? (user.name = name) : null;
        photo ? (user.photo = photo) : null;
        await user.save();
        user.password = undefined;
        return res.json({ msg: 'User updated successfully', user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

module.exports.FollowUnfollow = async (req, res) => {
    const { _id } = req.user;
    const { userID, follow } = req.body;
    try {
        const userToInteract = await User.findById(userID); //user to follow/unfollow
        const user = await User.findById(_id); //user that follows/unfollows
        if (follow) {
            user.following.includes(userID)
                ? null
                : (user.following.push(userID),
                  userToInteract.followers.push(user._id));
        } else {
            user.following = user.following.filter((userF) =>
                userF.toString() === userID ? null : userF
            );
            userToInteract.followers = userToInteract.followers.filter(
                (userF) =>
                    userF.toString() === user._id.toString() ? null : userF
            );
        }
        await user.save();
        await userToInteract.save();
        user.password = undefined;
        return res.json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

module.exports.getListDetails = async (req, res) => {
    const { usersIDS } = req.body;
    try {
        const users = await User.find({ _id: usersIDS }).select(
            'username photo'
        );
        return res.json({ users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

module.exports.searchUsers = async (req, res) => {
    const { search } = req.params;
    if (!search) {
        return res.status(401).json({ msg: 'No search' });
    }
    const regex = new RegExp(search, 'i');
    try {
        const usersByName = await User.find({ name: regex }).select(
            'username photo name' //photo name
        );
        const usersByUsername = await User.find({ username: regex }).select(
            'username photo name'
        );
        const allMatches = [...usersByName, ...usersByUsername];

        const seen = new Set();

        const users = allMatches.filter((user) => {
            const duplicate = seen.has(user.username);
            seen.add(user.username);
            return !duplicate;
        });

        return res.json({ users });
    } catch (error) {
        res.status(500);
        return res.json({ msg: error.message });
    }
};

module.exports.SavedUnsavedPost = async (req, res) => {
    const { _id } = req.user;
    const { postID, isSaved } = req.body;

    try {
        const user = await User.findById(_id);
        if (isSaved) {
            user.postsSaved = user.postsSaved.filter((post) =>
                post.toString() === postID ? null : post
            );
            await user.save();
        } else {
            user.postsSaved.includes(postID)
                ? null
                : user.postsSaved.push(postID),
                await user.save();
        }
        return res.json({ msg: "user's posts saved updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

module.exports.getPostsSaved = async (req, res) => {
    const { postsSaved } = req.user;

    try {
        const posts = await Post.find({ _id: postsSaved }).select('photo');
        return res.json({ posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};
