// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');

//We are retrieving this Schema from our Models, named 'User'
app.use(bodyParser.json());
// Require path
mongoose.Promise = global.Promise;
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
// define Schema variablecopy
var Schema = mongoose.Schema;
// define Post Schema
var FiftySchema = new mongoose.Schema({
 name: {type: String, required: true}, 
 
});
// define Comment Schema
// set our models by passing them their respective Schemas
mongoose.model('Fifty', FiftySchema);
var Fifty = mongoose.model('Fifty')
// store our models in variables

// route for getting a particular post and comments

app.get('/', function(req, res) {
 Fifty.find({}, function(err, users) {
  if(err) {
      console.log('something went wrong');
      res.json({message: "Error", err});
    }
    else { // else console.log that we did well and then redirect to the root route
     console.log('look the old people!');
    console.log(users)
    res.json(users);
    }
  })
})
app.get('/new/:name', function(req, res) {
    // This is where we would add the user from req.body to the database.
  var user = new Fifty({name: req.params.name});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  user.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added an old guy!');
      res.redirect('/');
    }
  })
})
app.get('/remove/:name', function(req, res) {
    Fifty.remove({name: req.params.name}, function(err){
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully removed an old guy!');
      res.redirect('/');
    }
  })
})
app.get('/:name', function(req, res) {
    Fifty.find({name: req.params.name}, function(err,user){
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully found an old guy!');
      res.json(user);
    }
  })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})



