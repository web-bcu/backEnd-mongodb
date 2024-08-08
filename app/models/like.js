const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = Schema.Types;

const likeSchema = new Schema({
    postId: {type: ObjectId, default: null},
    userId: {type: ObjectId, default: null},
}, {
    timestamps: true,
})

const LikeModel = mongoose.model('likes', likeSchema);

module.exports = LikeModel;