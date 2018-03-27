// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
var ElkSchema = new mongoose.Schema({
 name: {type: String},
 favorite_food: {type: String},
 hobby : {type: String}
},{timestamps: true})
mongoose.model('Elk', ElkSchema); // We are setting this Schema in our Models as 'User'
var Elk = mongoose.model('Elk') // We are retrieving this Schema from our Models, named 'User'
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
//app.get('/', function(req, res){

//  res.render('index')
//}) 
app.get('/elk/new', function(req, res){

  res.render('new')
})

app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
Elk.find({}, function(err, elks) {
  if(err) {
      console.log('something went wrong');
      res.redirect('/');
    }
    else { // else console.log that we did well and then redirect to the root route
     console.log('grabbed the elks!');
     
    console.log(elks)
 	  res.render('index',{elks:elks});
    }
  })
})
app.get('/elk/:id', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
Elk.find({_id: req.params.id}, function(err, elks) {
  if(err) {
      console.log('something went wrong');
      res.redirect('/');
    }
    else { // else console.log that we did well and then redirect to the root route
     console.log('grabbed the elks');
     
    console.log(elks)
    res.render('one',{elks:elks});
    }
  }) 
})
// Add User Request 
app.post('/elk', function(req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
  var elk = new Elk({name: req.body.name, favorite_food: req.body.food, hobby: req.body.hobby});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  elk.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added an elk!');
      res.redirect('/');
    }
  })
})
app.get('/elk/edit/:id', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
Elk.find({_id: req.params.id}, function(err, elks) {
  if(err) {
      console.log('something went wrong');
      res.redirect('/');
    }
    else { // else console.log that we did well and then redirect to the root route
     console.log('grabbed the elks');
     
    console.log(elks)
    res.render('edit',{elks:elks});
    }
  }) 
})
app.post('/elk/:id', function(req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
  //var elk = new Elk({name: req.body.name, quote: req.body.quote});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  Elk.find({_id: req.params.id}, function(err, elk){
    console.log("inside find")
    console.log(elk)
    elk[0].name = req.body.name;
    elk[0].favorite_food = req.body.food
    elk[0].hobby = req.body.hobby

  elk[0].save(function(err) {
    console.log("inside save")
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully updated an elk!');
      res.redirect('/');
    }
})
  })
})
app.post('/elk/destroy/:id', function(req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
  //var elk = new Elk({name: req.body.name, quote: req.body.quote});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  Elk.remove({_id: req.params.id}, function(err){
    
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully removed an elk!');
      res.redirect('/');
    }
})
  })

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})



