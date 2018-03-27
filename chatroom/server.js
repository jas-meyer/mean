var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var path = require("path");
session.f_message = []
session.namee = {}
session.count = 0;
session.count2 = 0
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/static")));
app.use(session({secret: 'sunkmybattleship'}));
app.set('views', path.join(__dirname, '/views')); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');
var server = app.listen(8000, function() {
 });
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  var sockets_ids = Object.keys(io.sockets.sockets)
  console.log(sockets_ids)
  socket.on( "sign_in", function (data){
    session.namee[socket.id] = data.name;
  
    let name = session.namee[socket.id];
    socket.emit( 'in', {response: name, full_message: session.f_message })
    
});
 socket.on( "sendmessage", function (data){
    // session.count++
    arr = data.message.split();
    var filter = ["freedom", "voting", "democracy", "vote", "protest", "unfair"]
    var filter2 = ["overthrow", "coup", "riot" ]
    console.log(arr);
    for(let i = 0; i < arr.length; i++){
    	for(let j = 0; j< filter.length; j++){
    		if(arr[i] == filter[j]){
    			session.count++
    		}
    	}
    }
    console.log(session.count);
    for(let i = 0; i < arr.length; i++){
    	for(let j = 0; j< filter.length; j++){
    		if(arr[i] == filter2[j]){
    			session.count2++
    		}
    	}
    }
    if(session.count == 3){
    	let message  = "Friendly Admin: WE ARE WATCHING"
    	let message_tags= "<h1>" + message + "</h1>"
    	io.emit( 'messager', {response: message_tags})
    }
    if(session.count2 == 1){
    	let message  = "Friendly Admin: YOU HAVE COMMITTED TREASON, WAIT TO BE DETAINED"
    	let message_tags= "<h1>" + message + "</h1>"
    	io.emit( 'messager', {response: message_tags})
    }
    else{
    let name = session.namee[socket.id]
    let message = name + ": " + data.message;
    let message_tags= "<h2>" + message + "</h2>"
    session.f_message +=  message_tags
    io.emit( 'messager', {response: message_tags})
}
    console.log(session.f_message)


    
    

});

});

app.get('/', function(req, res) {

	res.render('index');
        })


