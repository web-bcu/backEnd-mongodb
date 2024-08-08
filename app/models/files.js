const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = Schema.Types;

const fileSchema = new Schema({
    fileName: String,
    fileURL: {type: String, default: null},
    isFolder: Boolean,
    parentId: {type: ObjectId, default: null}
})

const FileModel = mongoose.model('files', fileSchema);

module.exports = FileModel;