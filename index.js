/* Load modules */
const express = require("express");
const morgan  = require("morgan");
const app = express();
const bodyParser = require("body-parser");

/* Database configuration */
const database = require('./api/config/dbconfig');

/* Init database */
database.init();

/* Init server listening */
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server listening on port : " + port);
});

/* Express configuration */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


if(process.env.NODE_ENV !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined'));
}

/* Router configuration */
const REST_API_ROOT = '/api';
global.restApiRoot = REST_API_ROOT;
app.use(REST_API_ROOT, require('./api/routes/router'));

module.exports = app;