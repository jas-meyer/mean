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
// define Schema variablecopy
var Schema = mongoose.Schema;
// define Post Schema
var MessageSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 4}, 
 text: {type: String, required: true }, 
 comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true });
// define Comment Schema
var CommentSchema = new mongoose.Schema({
  name: {type: String, required: true }, 
 _message: {type: Schema.Types.ObjectId, ref: 'Message'},
 text: {type: String, required: true }
}, {timestamps: true });
// set our models by passing them their respective Schemas
mongoose.model('Message', MessageSchema);
mongoose.model('Comment', CommentSchema);
// store our models in variables
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');
// route for getting a particular post and comments
app.post('/message', function(req,res){
console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
  var message = new Message({name: req.body.m_name, text: req.body.message });
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  message.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added an message!');
      res.redirect('/');
    }
  })

})

app.post('/messages/:id', function (req, res){
  Message.findOne({_id: req.params.id}, function(err, message){
         console.log(req.params.id)
         console.log("posting comment")
         var comment = new Comment({name: req.body.c_name, text: req.body.comment});
         comment._message = message._id;
         message.comments.push(comment);
         comment.save(function(err){
                 message.save(function(err){
                       if(err) { console.log('Error'); } 
                       else { res.redirect('/'); }
                 });
         });
   });
 });

app.get('/', function(req, res) {
 Message.find({})
 .populate('comments')
 .exec(function(err, post) {
    console.log(post)
    console.log(post[3].comments)
    console.log(post[3].comments[1].name)
      res.render('wall', {message: post});
        })
})


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})



