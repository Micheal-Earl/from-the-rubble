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

// get the players intent for the next tick
var intent = {
  constructCity: {
    flag: false,
    posX: NaN,
    posY: NaN
  },
  upgradeCity: {
    flag: false,
    posX: NaN,
    posY: NaN
  },
  makeTroops: {
    flag: false,
    amount: NaN,
    posX: NaN,
    posY: NaN
  },
  sendTroops: {
    flag: false,
    posX: NaN,
    posY: NaN
  }
}

// **TODO** need to add context menu on click with options
document.addEventListener('click', function(event) {
  //console.log(event);
  console.log("Client click info")
  console.log(Math.floor(event.clientX/16))
  console.log(Math.floor(event.clientY/16))
});

// emit that we have a new player starting the client
socket.emit('new player');

// emit player intent every second, maybe change this so intent
// is only emitted when the player wants to do something
setInterval(function() {
  socket.emit('intent', intent);
}, 1000);

// check browsers pixi.js compatibility
let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
// print to console to confirm pixi.js is working
PIXI.utils.sayHello(type)

// define new pixi.js renderer and append it to the div with game id
// magic number 100 is height/width of tilemap, magic number 16 is height/width of each tile
// doing this for now because I do not know how to make the view pan with click and drag
let app = new PIXI.Application({width: 100 * 16, height: 100 * 16});
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
