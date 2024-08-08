const fileService = require('../services/file.service')

module.exports = function (app) {
    app.post('/file/create', fileService.createFile);
    app.get('/file/get', fileService.getFiles)
    app.delete('/file/delete', fileService.deleteFile);
    app.put('/file/update', fileService.updateFile);
    app.get('/file/folder', fileService.getFolders);
}