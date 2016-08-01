var express = require('express');
var app = new express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var opener = require('opener');

var Users = require('./models/users.js');
var Projects = require('./models/projects.js');
var Customers = require('./models/customers.js');

var testData = require('./scripts/testData.js');
var routing = require('./scripts/routing.js');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/AGILE_TRACKER', function(err) {
    if(err) {
        return console.log(err);
    }
    //    testData.addtestData(Users, Projects, Customers);
    routing.getRoutes(app,Projects, Users, Customers);

    app.listen(3000, function() {
        console.log('APP is running!');
        opener('http://localhost:3000/');
    });
});
