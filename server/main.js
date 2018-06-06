var path      = require('path');

var express   = require('express');
var http      = require('http');
var socketIO  = require('socket.io');

var app       = express();
var server    = http.Server(app);
var io        = socketIO(server);

// config
const PORT = 3000;
const IP = '0.0.0.0';

// send index.html to web browser on GET request and use 
// /../client for static files like style.css and script.js
app.use(express.static(path.join(__dirname, '..', 'client')));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

var players = {};
// listen for the connection event
io.on('connection', function(socket) {
	console.log("a user connected");

	socket.on('chat message', function(message) {
		console.log(message);
		io.emit('chat message', message);
	});
	
	socket.on('disconnect', function() {
		console.log("user disconnected");
	});	

	socket.on('new player', function() {
    players[socket.id] = {
      x: 300,
      y: 300
    };
	});
	
  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }
	});
});

setInterval(function() {
	io.sockets.emit('state', players);
	console.log("wtf");
}, 1000 / 60);

server.listen(PORT, function() {
	console.log("Starting server on port " + PORT + ".");
});