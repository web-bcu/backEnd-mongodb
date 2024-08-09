const Express = require('express')
const App = Express();
const cors = require('cors');

App.use(cors());

module.exports = function (app) {
    require('./routes/test.route')(app);
    require('./routes/users.route')(app);
    require('./routes/file.route')(app);
    require('./routes/post.route')(app);
    require('./routes/like.route')(app);
    require('./routes/savedPost.route')(app);
    require('./routes/gemini.route')(app);
    require('./routes/admin.route')(app);
}