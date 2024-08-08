const SavedPost = require('../models/savedPost')

module.exports = {
    savePost: async function (req, res) {
        try {
            const {postId, userId} = req.body;
            const newSavedPost = await SavedPost.create({
                postId,
                userId
            })

            return res.status(200).json(newSavedPost);
        } catch(error) {
            console.log(error);
            return res.status(400).json({error: "Something went wrong"});
        }
    },

    getUsersSavedPost: async function (req, res) {
        try {
            const {postId} = req.query;
            const allPosts = await SavedPost.find({postId: postId})
            return res.json(allPosts)
        } catch(error) {
            console.log(error);
            return res.status(400).json({error: "Something went wrong"});
        }
    },

    // removeSavePost: async function (req, res) {
    //     try {
    //         const {postId, userId} = req.body;
    //         await SavedPost.deleteOne({postId: postId, userId: userId});
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    removeSavePost: async function (req, res) {
        try {
            const { postId, userId } = req.body;
            
            if (!postId || !userId) {
                return res.status(400).json({ message: "Post ID and User ID are required" });
            }
    
            const result = await SavedPost.deleteOne({ postId: postId, userId: userId });
            
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