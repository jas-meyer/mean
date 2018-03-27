var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));
app.use(session({secret: 'sunkmybattleship'}));
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');
app.get('/', function(req, res) {

	res.render('index');
        })
app.post('/process', function (req, res){
   console.log("POST DATA \n\n", req.body)
  req.session.name = req.body.name
  req.session.location = req.body.location
  req.session.language = req.body.language
  req.session.comment = req.body.comment
  
   res.redirect('/result')
});
app.get('/result', function(req, res) {

	res.render('result',{name: req.session.name, location: req.session.location, language: req.session.language, comment: req.session.comment});
	})
app.post('/back', function(req, res) {

	res.redirect('/');
	})
app.listen(5000, function() {
})
