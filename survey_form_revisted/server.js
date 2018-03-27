var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var path = require("path");
var server = app.listen(8000, function() {
 });
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
  // all the server socket code goes in here
  socket.on( "posting_form", function (data){
    let messagestr = '{Name: ' + data.name + ' Location: ' + data.location + ' Langauge: ' + data.langauge + ' Comment: ' + data.comment + '}';
    console.log(messagestr)
    socket.emit( 'updated_message', {response: messagestr})
    let rando = Math.floor(Math.random()*1000)+1
    socket.emit('random_number', {response2: rando })
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


