const socket = io(); // client side socket.io lib

// CHAT SYSTEM
$('form').submit(function() {
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});
socket.on('chat message', function(message) {
  $('#messages').append($('<li>').text(message));	
});
// CHAT SYSTEM END

// GET MOVEMENT SHIT
var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});

document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});

socket.emit('new player');
setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);
// END GET MOVEMENT SHIT

// check browsers pixi.js compatibility
let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
// print to console to confirm pixi.js is working
PIXI.utils.sayHello(type)

// define new pixi.js renderer and append it to the div with game id
let app = new PIXI.Application({width: 800, height: 640});
document.getElementById('game').appendChild(app.view);

// make the game render in the entire browser window and auto re-size
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

const graphics = new PIXI.Graphics();

PIXI.loader
  .add([
    "assets/grass1.png",
    "assets/grass2.png",
    "assets/grass3.png",
    "assets/grass4.png"
  ])
  .load(setup);

// initialize sprites
let grass1_s;
let grass2_s;
let grass3_s;
let grass4_s;

function setup() {
  // set up sprites
  grass1_s = new PIXI.Sprite(PIXI.loader.resources["assets/grass1.png"].texture);
  grass2_s = new PIXI.Sprite(PIXI.loader.resources["assets/grass2.png"].texture);
  grass3_s = new PIXI.Sprite(PIXI.loader.resources["assets/grass3.png"].texture);
  grass4_s = new PIXI.Sprite(PIXI.loader.resources["assets/grass4.png"].texture);

  socket.emit('client ready');

  socket.on('map', function(map) {
    console.log(map);
    console.log("map loaded!");
    for(let y = 0; y < map.map.length; y++) {
      for(let x = 0; x < map.map[y].length; x++) {
        var pixelX = x * 16;
        var pixelY = y * 16;
        let sprite = new PIXI.Sprite(
          PIXI.loader.resources["assets/" + map.map[y][x].tileSprite + ".png"].texture
        );
        app.stage.addChild(sprite);
        sprite.position.set(pixelX, pixelY);
      }
    }
  });

  // use pixi.js ticker to make game loop?
  app.ticker.add(delta => gameLoop(delta));
}

// runs once per frame, idk
function gameLoop(delta) {
  // do stuff
}

socket.on('state', function(players) {
  for (var id in players) {
    var player = players[id];
    //stage.addChild(pSprite);
    //pSprite.set.position(player.x, player.y);
  }
});
