const likeService = require('../services/like.service');

module.exports = function (app) {
    app.post('/like/create', likeService.createLike);
    app.get('/like/get', likeService.getLike);
    app.delete('/like/delete', likeService.deleteLike);
}