const Likes = require('../models/like')

module.exports = {
    createLike: async function (req, res) { 
        try {
            const {postId, userId} = req.body;
            const newLike = await Likes.create({
                postId,
                userId
            })

            return res.status(200).json(newLike);
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: "Something went wrong"});
        }
    },

    getLike: async function (req, res) {
        try {
            const {postId} = req.query;
            const allLike = await Likes.find({postId: postId});

            return res.status(200).json(allLike);
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: "Something went wrong"});
        }
    },

    deleteLike: async function (req, res) {
        try {
            const { postId, userId } = req.body;
            
            if (!postId || !userId) {
                return res.status(400).json({ message: "Post ID and User ID are required" });
            }
    
            const result = await Likes.deleteOne({ postId: postId, userId: userId });
            
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "No saved post found with the given criteria" });
            }
    
            res.status(200).json({ message: "Saved post removed successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "An error occurred while removing the saved post" });
        }
    }
}