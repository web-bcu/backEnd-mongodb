const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = Schema.Types;

const savedPostSchema = new Schema({
    postId: {type: ObjectId, default: null},
    userId: {type: ObjectId, default: null},
}, {
    timestamps: true,
})

const SavedPostModel = mongoose.model('saved_posts', savedPostSchema);

module.exports = SavedPostModel;