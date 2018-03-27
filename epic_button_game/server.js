var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var path = require("path");
var count = 0
var server = app.listen(5678, function() {
 });
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
  
  // all the server socket code goes in here
  socket.on( "add", function (){
    count++
    console.log(count)
    io.emit( 'addr', {response: count})
})
socket.on( "reset", function (){
    count = 0
    console.log(count)
    io.emit( 'resetr', {response: count})
})  
})
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/static")));
app.use(session({secret: 'sunkmybattleship'}));
app.set('views', path.join(__dirname, '/views')); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');
app.get('/', function(req, res) {

	res.render('index');
        })


