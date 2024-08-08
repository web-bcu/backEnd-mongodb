const File = require('../models/files')
const Rest = require('../utils/restware')

module.exports = {
    createFile: async function (req, res) {
        try {
            const {fileName, fileURL, isFolder, parentId} = req.body;
            const file = await File.create({
                fileName,
                fileURL,
                isFolder,
                parentId
            })

            return res.json(file);
        } catch (error) {
            console.log(error);
            return Rest.sendError(res, 400, 'create_file_fail', 400, error);
        }
    },

    getFiles: async function (req, res) {
        try {
            const {parentId} = req.query;
            if (parentId === "null" || parentId === "undefined") {
                const allFiles = await File.find({parentId: null})
                return res.json(allFiles);
            }
            const allFiles = await File.find({parentId: parentId})

            return res.json(allFiles);
        } catch(error) {
            console.log(error);
        }
    },

    getFolders: async function (req, res) {
        try {
            const allFolders = await File.find({isFolder: true});
            return res.json(allFolders);
        } catch(error) {
            return res.json({error: "Something went wrong"})
        }
    },

    updateFile: async function (req, res) {
        try {
            const {_id, name, parentId} = req.body;
            if (name) {
                const updateName = await File.updateOne({_id: _id}, {fileName: name})
                return res.json(updateName);
            } 
            const updateParent = await File.updateOne({_id: _id}, {parentId: parentId})
            return res.json(updateParent);
        } catch (error) {
            console.log(error);
        }
    },

    deleteFile: async function (req, res) {
        try {
            const {fileId} = req.query;
            const delFile = await File.deleteOne({_id: fileId});
            return res.json(delFile);
        } catch (error) {
            console.log(error);
        }
    }
}