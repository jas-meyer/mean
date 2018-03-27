// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors');

//We are retrieving this Schema from our Models, named 'User'
app.use(bodyParser.json());
app.use(express.static( __dirname + '/authors/dist' ));
// Require path
mongoose.Promise = global.Promise;
var path = require('path');
// Setting our Static Folder Directory
// Routes
// Root Request
// define Schema variablecopy
var Schema = mongoose.Schema;
// define Post Schema
var AuthorSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: [3, "Name must be 3 characters long"],
 validate: {
   validator: function (value) {
     return /^[A-Za-z]{3,50}/.test(value);
   },
   message: "Name must be at least 3 letters"
 }
},
}, {timestamps:true});
// define Comment Schema
// set our models by passing them their respective Schemas
mongoose.model('Author', AuthorSchema);
var Author = mongoose.model('Author')
// store our models in variables

// route for getting a particular post and comments

app.get('/authors', function(req, res) {
 Author.find({}, function(err, authors) {
  if(err) {
      console.log('something went wrong');
      res.json({message: "Error", err});
    }
    else { // else console.log that we did well and then redirect to the root route
     console.log('look at the authors!');
    console.log(authors)
    res.json(authors);
    }
  })
})
app.post('/authors', function(req, res) {
 console.log(req.body.name)
 var author = new Author({name: req.body.name});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  author.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
      console.log(err)
      res.json({message:"Error", err});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a author!');
      res.redirect('/authors');
    }
  })
})
app.put('/authors/:id', function(req,res){
  console.log(req.body.name)
  Author.findOne({_id: req.params.id}, function(err, author){
    author.name = req.body.name;


    author.save(function(err){
      if(err) {
      console.log('something went wrong');
      res.json({message:"Error", err});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully updated an author!');
      res.json(err);
    }
    })
  })
})
app.delete('/authors/:id', function(req, res) {
    console.log(req.params.id)
    Author.remove({_id: req.params.id}, function(err){
    if(err) {
      console.log('something went wrong');
      console.log(err)
      res.json({message:"Error", err});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully removed a task!');
      res.json(err);
    }
  })
})
app.get('/authors/:id', function(req, res) {
    console.log(req.params.id)
    Author.findOne({_id: req.params.id}, function(err,ones){
    if(err) {
      console.log('something went wrong');
      res.json({message:"Error", error});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully found an author!');
      res.json(ones);
    }
  })
})
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./authors/dist/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
