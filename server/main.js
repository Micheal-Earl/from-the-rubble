// used to get abolute paths, need to write a routes.js or something
const path      = require('path');

// external libs
const express   = require('express');
const http      = require('http');
const socketIO  = require('socket.io');

const app       = express();
const server    = http.Server(app);
const io        = socketIO(server);

// my objects
const Map       = require('./map.js');
const Player    = require('./player.js');

// config
const PORT_NUMBER = 80;
const IP = '0.0.0.0';
var map = new Map(150, 150);
map.generateSprites();
//map.visualizeMap(); // this is a debug method

// send index.html to web browser on GET request and use 
// /../client for static files like style.css and script.js
app.use(express.static(path.join(__dirname, '..', 'client')));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// empty object to store player information
var players = {};

// listen for the connection event
io.on('connection', function(socket) {
	console.log("User " + socket.id + " connected");

	// emit map data to the client so that it can draw the tilemap
	socket.on('client ready', function() {
		io.sockets.emit('map', map);
	});

	socket.on('chat message', function(message) {
		message = socket.id + ": " + message;
		console.log(message);
		io.emit('chat message', message);
	});

	// currently keeping track of players by their socket ID, 
	// need to write auth service and keep player info in DB
	socket.on('new player', function() {
    players[socket.id] = new Player(socket.id);
	});

	socket.on('intent', function(intent) {
		cityX = intent.constructCity.posX;
		cityY = intent.constructCity.posY;
		console.log(intent.constructCity.posX);
		console.log(intent.constructCity.posY);
		map.map[cityY][cityX].tileSprite = "city";
		//console.log(map.map[cityX][cityY]);
		console.log(intent.constructCity.flag);
	});

	socket.on('disconnect', function() {
		delete players[socket.id]; // **TODO** look into alternative for removing key/value from hash
		console.log("User " + socket.id + " disconnected");
	});
});

// update loop currently one per second
setInterval(function() {
	// io.sockets.emit('state', players);
	io.sockets.emit('map', map);
	for(player in players) {
		players.tick();
	}
}, 1000);

server.listen(PORT_NUMBER, function() {
	console.log("Starting server on port " + PORT_NUMBER + ".");
});