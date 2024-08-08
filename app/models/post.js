const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = Schema.Types;

const postSchema = new Schema({
    userId: {type: ObjectId, default: null},
    content: String,
}, {
    timestamps: true,
})

const PostModel = mongoose.model('posts', postSchema);

module.exports = PostModel;