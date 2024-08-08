const geminService = require('../services/gemini.service');

module.exports = function (app) {
    app.post('/gemini/tictactoe', geminService.playGames);
}