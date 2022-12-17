// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// Imports routes
const router = require('./routes/router');
const configParams = require('./configParams');


// Set up mongoose connection
mongoose.connect(configParams.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.info("Connected to db");
});
const app = express();
app.use(bodyParser.json({limit: "50mb"}));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});
// Set up mongoose connection// Set up mongoose connection// Set up mongoose connection

app.use('/', router);

let port = process.env.PORT || 2550;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});

//bacem-apis