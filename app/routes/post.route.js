const postService = require('../services/post.service');

module.exports = function (app) {
    app.post('/post/create', postService.createPost);
    app.get('/post/get', postService.getPost);
    app.get('/post/getall', postService.getAllPost);
    app.delete('/post/delete', postService.deletePost);
    app.get('/post/getone', postService.getOnePost)
}