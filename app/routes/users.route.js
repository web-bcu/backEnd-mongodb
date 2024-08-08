const userService = require('../services/users.service')

module.exports = function (app) {
    app.post('/user/register', userService.register);
    app.post('/user/login', userService.loginUser);
    app.get('/user/profile', userService.getProfile);
    app.get('/user/get', userService.findUser)
}