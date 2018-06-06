var path      = require('path');

var express   = require('express');
var http      = require('http');
var socketIO  = require('socket.io');

var app       = express();
var server    = http.Server(app);
var io        = socketIO(server);

// config
const PORT_NUMBER = 3000;
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
	console.log("User " + socket.id + " connected");

	socket.on('chat message', function(message) {
		message = socket.id + ": " + message;
		console.log(message);
		io.emit('chat message', message);
	});

	socket.on('new player', function() {
    players[socket.id] = {
      x: 300,
			y: 300,
			// this magic property generates a random color hex value
			color: '#'+Math.floor(Math.random()*16777215).toString(16)
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

	socket.on('disconnect', function() {
		delete players[socket.id]; // **TODO** look into alternative for removing key/value from hash
		console.log("User " + socket.id + " disconnected");
	});	
});

setInterval(function() {
	io.sockets.emit('state', players);
}, 1000 / 60);

server.listen(PORT_NUMBER, function() {
	console.log("Starting server on port " + PORT_NUMBER + ".");
});