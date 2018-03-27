// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App

//We are retrieving this Schema from our Models, named 'User'
app.use(bodyParser.json());
app.use(express.static( __dirname + '/myFirstAngularApp/dist' ));
// Require path

var path = require('path');



app.listen(8000, function() {
    console.log("listening on port 8000");
})



