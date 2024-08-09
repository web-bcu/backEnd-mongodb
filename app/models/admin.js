const mongoose = require('mongoose')
const {Schema} = mongoose

const adminSchema = new Schema({
    email: String,
    name: String,
})

const AdminModel = mongoose.model('admins', adminSchema);

module.exports = AdminModel;