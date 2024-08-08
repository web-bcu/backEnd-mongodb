const savedPostService = require('../services/savedPost.service');

module.exports = function (app) {
    app.post('/save/create', savedPostService.savePost);
    app.delete('/save/delete', savedPostService.removeSavePost)
    app.get('/save/getuser', savedPostService.getUsersSavedPost)
    // app.get('/save/get', likeService.getLike);
    // app.delete('/save/delete', likeService.deleteLike);
}