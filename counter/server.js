var express = require("express");
var session = require('express-session');
var app = express();
app.use(session({secret: 'sunkmybattleship'}));
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');
session.count = 0
app.get('/', function(req, res) {
	
	session.count++ 
	console.log(session.count)
	let count = session.count
	res.render('index',{count : count});
        })
app.post('/add', function (req, res){
    session.count+= 1; 
    res.redirect('/')
});
app.post('/reset', function(req, res){
	session.count = 0
	res.redirect('/')
});
app.listen(5000, function() {
})
