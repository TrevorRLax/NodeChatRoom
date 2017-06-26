// http included in node,
// first we need to actually import the packages we downloaded 
// using the require keyword 

var express = require("express");
var app = express();
var http = require("http").Server(app); //starts the server
var io = require("socket.io")(http);// IO is going to be how we communiate between clients 

// you can think of IO as being the server, passing data ewteen two/more clients 

// app.get(path, callback)
app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

// use express to serve up static files(css, js, other htmls besides index) so that our page can be pretty 
app.use(express.static(__dirname+"/public"));




// we are going to handle the socket evetns here 
io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});



// tell the server where it should run on the host 
http.listen(process.env.PORT || 3000, function(){
	console.log("Listening on *:3000");
});