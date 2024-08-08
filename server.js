const Express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');

const App = Express();
const port = 8000;

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database not connected', err))

App.use(
    cors({
        credentials: true, 
        origin: 'http://localhost:3000'
    })
); 
App.use(Express.json())
App.use(cookieParser())
App.use(Express.urlencoded({extended: false}))

require('./app/route')(App);

App.listen(port, function () {
    console.log(`Server is running on port ${port}`)
});

module.exports = App;