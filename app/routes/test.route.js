const testService = require('../services/test.service')

module.exports = function (app) {
    app.get('/test', testService.getHello);
}