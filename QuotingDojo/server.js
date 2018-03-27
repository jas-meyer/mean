// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
var UserSchema = new mongoose.Schema({
 name: {type: String},
 quote: {type: String}
},{timestamps: true})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'
app.use(bodyParser.urlencoded({ extended: true }));
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
app.get('/', function(req, res){

  res.render('index')
})
app.post('/red', function(req,res) {


 res.redirect('/quotes') 
});

app.get('/quotes', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
User.find({}, function(err, users) {
  if(err) {
      console.log('something went wrong');
      res.redirect('/');
    }
    else { // else console.log that we did well and then redirect to the root route
     console.log('grabbed the users!');
     
    console.log(users)
 	  res.render('result',{users:users});
    }
  })
 
})
// Add User Request 
app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
  var user = new User({name: req.body.name, quote: req.body.quote});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  user.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a quote!');
      res.redirect('/quotes');
    }
  })
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})