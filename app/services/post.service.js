const Posts = require('../models/post');

module.exports = {
    createPost: async function (req, res) {
        try {
            const {userId, content} = req.body;
            const newPost = await Posts.create({
                userId,
                content
            })

            return res.status(200).json(newPost);
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: "Something went wrong"});
        }
    },

    getAllPost: async function (req, res) {
        try {
            const allPost = await Posts.find().sort({ createdAt: -1 });;

            return res.status(200).json(allPost);
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: "Something went wrong"});
        }
    },

    getPost: async function (req, res) {
        try {
            const {userId} = req.body;
            const userPost = await Posts.find({userId: userId});

            return res.status(200).json(userPost);
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: "Something went wrong"});
        }
    },

    deletePost: async function (req, res) {
        try {
            const {postId} = req.query;
            const deletedPost = await Posts.deleteOne({_id: postId});

            return res.json(deletedPost);
        } catch(error) {
            console.log(error);
            return res.status(400).json({error: "Something went wrong"});
        }
    }
}