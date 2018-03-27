// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var session = require('express-session');
session.namee = ""
mongoose.connect('mongodb://localhost/login');
//We are retrieving this Schema from our Models, named 'User'
app.use(bodyParser.urlencoded({
  extended: true
}));
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
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  first_name: {
    type: String,
    required: true,
    minlength: 4
  },
  last_name: {
    type: String,
    required: true,
    minlength: 4
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});
// define Comment Schema
// set our models by passing them their respective Schemas
mongoose.model('User', UserSchema);
// store our models in variables
var User = mongoose.model('User');
app.get('/', function(req, res) {
  res.render('index');
})
app.post('/create', function(req, res) {
  console.log("POST DATA", req.body);
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      // Store hash in your password DB. 
      // This is where we would add the user from req.body to the database.
      var user = new User({
        email: req.body.email,
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        password: hash,
        dob: req.body.dob
      });
      // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
      user.save(function(err) {
        // if there is an error console.log that something went wrong!
        if (err) {
          console.log('something went wrong');
        } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully added an user!');
          session.namee = req.body.firstname
          res.redirect('/success');
        }
      })
    });
  });
})
app.post('/login', function(req, response) {
  if ((req.body.logpassword).length < 1) {
    console.log("password field cannot be blank")
    response.redirect('/')
  } else {
    User.findOne({
      email: req.body.logemail
    }, function(err, data) {
      //console.log("Data email is:"+data.email)
      if (data == null) {
        console.log("Nothing was pulled")
        response.redirect('/')
      } else {
        console.log("email matched!!!!")
        bcrypt.compare(req.body.logpassword, data.password).then((res) => {
          console.log(res)
          if (res) {
            console.log("The password is right!")
            session.namee = data.first_name
            console.log(session.namee)
            response.redirect('/success')
          } else {
            console.log('password does not match!')
            response.redirect('/')
          }
        })
      }
    })
  }
})
app.get('/success', function(req, res) {
  res.render('success', {
    name: session.namee
  })
});
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})


