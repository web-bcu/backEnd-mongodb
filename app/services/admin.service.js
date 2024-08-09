const Admin = require('../models/admin')
const Rest = require('../utils/restware')

module.exports = {
    addAdmin: async function (req, res) {
        try {
            const {email, name} = req.body;
            console.log(email, name)
            const admin = await Admin.create({
                email, name
            });

            return res.json(admin);
        } catch (error) {
            console.log(error);
            return Rest.sendError(res, 400, 'create_admin_fail', 400, error);
        }
    },

    editAdmin: async function (req, res) {
        try {
            const {adminId, name, email} = req.body;
            await Admin.updateOne({_id: adminId}, {name, email});
            return res.json("Editted")
        } catch (error) {
            consolr.log(error)
            return Rest.sendError(res, 400, 'edit_admin_fail', 400, error);
        }
    },

    deleteAdmin: async function (req, res) {
        try {
            const {adminId} = req.query;
            await Admin.deleteOne({_id: adminId});
            return res.json("Deleted")
        } catch(error) {
            console.log(error);
            return Rest.sendError(res, 400, 'delete_admin_fail', 400, error);
        }
    },

    getAdmin: async function (req, res) {
        try {
            const adminList = await Admin.find();
            return res.json(adminList)
        } catch(error) {
            console.log(error);
            return Rest.sendError(res, 400, 'delete_admin_fail', 400, error);
        }
    }
}