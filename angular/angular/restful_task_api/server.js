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
app.use(express.static( __dirname + '/myFirstAngularApp/dist' ));
// Require path
mongoose.Promise = global.Promise;
var path = require('path');
// Setting our Static Folder Directory
// Routes
// Root Request
// define Schema variablecopy
var Schema = mongoose.Schema;
// define Post Schema
var TaskSchema = new mongoose.Schema({
 title: {type: String, required: true},
 description: {type: String, default: ""},
 completed: {type: Boolean, default: false}
}, {timestamps:true});
// define Comment Schema
// set our models by passing them their respective Schemas
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task')
// store our models in variables

// route for getting a particular post and comments

app.get('/tasks', function(req, res) {
 Task.find({}, function(err, tasks) {
  if(err) {
      console.log('something went wrong');
      res.json({message: "Error", err});
    }
    else { // else console.log that we did well and then redirect to the root route
     console.log('look at the tasks!');
    console.log(tasks)
    res.json(tasks);
    }
  })
})
app.post('/tasks', function(req, res) {
 var task = new Task({title: req.body.title, description: req.body.description, completed: req.body.completed});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  task.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
      res.json({message:"Error", error});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a task!');
      res.redirect('/tasks');
    }
  })
})
app.put('/tasks/:id', function(req,res){
  Task.findOne({_id: req.params.id}, function(err, task){
    task.title = req.body.title;
    task.description = req.body.description;
    task.completed = req.body.completed;

    task.save(function(err){
      if(err) {
      console.log('something went wrong');
      res.json({message:"Error", error});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully updated a task!');
      res.redirect('/tasks');
    }
    })
  })
})
app.delete('/tasks/:id', function(req, res) {
    Task.remove({_id: req.params.id}, function(err){
    if(err) {
      console.log('something went wrong');
      res.json({message:"Error", error});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully removed a task!');
      res.redirect('/tasks');
    }
  })
})
app.get('/tasks/:id', function(req, res) {
    Task.find({_id: req.params.id}, function(err,task){
    if(err) {
      console.log('something went wrong');
      res.json({message:"Error", error});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully found a task!');
      res.json(task);
    }
  })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})



