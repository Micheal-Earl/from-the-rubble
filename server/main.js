const path      = require('path');

const express   = require('express');
const http      = require('http');
const socketIO  = require('socket.io');

const app       = express();
const server    = http.Server(app);
const io        = socketIO(server);

const Map       = require('./Map.js');

// config
const PORT_NUMBER = 80;
const IP = '0.0.0.0';
var map = new Map(40, 50);
map.generateSprites();
map.visualizeMap();

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

	socket.on('client ready', function() {
		io.sockets.emit('map', map);
	});

	socket.on('chat message', function(message) {
		message = socket.id + ": " + message;
		console.log(message);
		io.emit('chat message', message);
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

	socket.on('disconnect', function() {
		delete players[socket.id]; // **TODO** look into alternative for removing key/value from hash
		console.log("User " + socket.id + " disconnected");
	});	
});


// update loop currently 60/s
setInterval(function() {
	io.sockets.emit('state', players);
}, 1000 / 60);

server.listen(PORT_NUMBER, function() {
	console.log("Starting server on port " + PORT_NUMBER + ".");
});