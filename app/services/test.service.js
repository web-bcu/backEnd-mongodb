const Rest = require('../utils/restware');

module.exports = {
    getHello: function (req, res) {
        const out = {message: "Hello BCU study space"};
        return Rest.sendSuccessOne(res, out, 200)
    }
}