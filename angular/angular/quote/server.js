// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotes');

//We are retrieving this Schema from our Models, named 'User'
app.use(bodyParser.json());
app.use(express.static( __dirname + '/quote-client/dist' ));
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
 name: {type: String, required:true, minlength: 3},
 quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}]
}, {timestamps:true});
var QuoteSchema = new mongoose.Schema({
 content : {type: String, required:true, minlength: 3},
 vote: {type: Number},
 _author: [{type: Schema.Types.ObjectId, ref: 'Author'}]
}, {timestamps:true});
// define Comment Schema
// set our models by passing them their respective Schemas
mongoose.model('Author', AuthorSchema);
mongoose.model('Quote', QuoteSchema)
var Author = mongoose.model('Author');
var Quote = mongoose.model('Quote');
// store our models in variables

// route for getting a particular post and comments

app.get('/author', function(req, res) {
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
app.get('/quote', function(req, res) {
 Quote.find({}, function(err, quotes) {
  if(err) {
      console.log('something went wrong');
      res.json({message: "Error", err});
    }
    else { // else console.log that we did well and then redirect to the root route
     console.log('look at the quotes!');
    console.log(quotes)
    res.json(quotes);
    }
  })
})
app.post('/author', function(req, res) {
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
      res.redirect('/author');
    }
  })
})

app.put('/author/:id', function(req,res){
  Author.findOne({_id: req.params.id}, function(err, author){
    author.name = req.body.name
    author.save(function(err){
      if(err) {
      console.log('something went wrong');
      res.json({message:"Error", err});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully updated an author!');
      res.json(author);
    }
    })
  })
})
app.delete('/author/:id', function(req, res) {
    console.log(req.params.id)
    Author.remove({_id: req.params.id}, function(err){
    if(err) {
      console.log('something went wrong');
      console.log(err)
      res.json({message:"Error", err});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully removed a author!');
      res.json(err);
    }
  })
})
app.get('/author/:id', function(req, res) {
    console.log(req.params.id)
    Author.findOne({_id: req.params.id}, function(err,author){
    if(err) {
      console.log('something went wrong');
      res.json({message:"Error", error});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully found an author!');
      res.json(author);
    }
  })
})
//getting quotes for author
app.get('/quote/:id', function (req,res){
  Quote.find({_author: req.params.id}, function(err, quotes) {
   if(err) {
       console.log(req.params.id)
       console.log('something went wrong');
       res.json({message: "Error", err});
     }
     else { //
      console.log('look at the quotes!');
     console.log(quotes)
     res.json(quotes);
     }
   })
 })
// adding quotes
app.post('/author/:id', function(req, res) {
  Author.findOne({_id: req.params.id}, function(err, author){
          console.log(req.params.id)
          console.log("posting comment")
          var quote = new Quote({content: req.body.content, vote: 0});
          quote._author = author._id;
          author.quotes.push(quote);
  author.save(function(err) {
    if(err) {
      console.log('something went wrong');
      console.log(err)
      res.json({message:"Error", err});
}
  else {
  console.log('successfully updated a quote!');
}
    quote.save(function(err){
    if(err) {
      console.log('something went wrong');
      console.log(err)
      res.json({message:"Error", err});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a quote!');
      res.json(quote);
    }
  })
})
})
})
// Vote Up
app.get('/quote/plus/:id', function(req,res){
  Quote.findOne({_id: req.params.id}, function(err, quote){
    console.log(quote.vote)
    plus = quote.vote + 1;
    quote.vote = plus
    quote.save(function(err){
      if(err) {
      console.log('something went wrong');
      res.json({message:"Error", err});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a vote!');
      res.json(err);
    }
    })
  })
})
app.get('/quote/minus/:id', function(req,res){
  Quote.findOne({_id: req.params.id}, function(err, quote){
    console.log(quote.vote)
    minus = quote.vote - 1;
    quote.vote = minus
    quote.save(function(err){
      if(err) {
      console.log('something went wrong');
      res.json({message:"Error", err});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully subtracted a vote!');
      res.json(err);
    }
    })
  })
})
app.delete('/quote/:id', function(req, res) {
    console.log(req.params.id)
    Quote.remove({_id: req.params.id}, function(err){
    if(err) {
      console.log('something went wrong');
      console.log(err)
      res.json({message:"Error", err});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully removed a quote!');
      res.json(err);
    }
  })
})
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./quote-client/dist/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
