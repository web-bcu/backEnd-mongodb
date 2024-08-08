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

const corsOptions = {
    origin: ["https://test-frontend-beryl.vercel.app", "http://localhost:3000"], // Replace with your client’s domain
    credentials: true,  // This allows cookies to be sent from the client
};
App.use(cors(corsOptions)); 
App.use(Express.json())
App.use(cookieParser())
App.use(Express.urlencoded({extended: false}))

require('./app/route')(App);

App.listen(port, function () {
    console.log(`Server is running on port ${port}`)
});

module.exports = App;