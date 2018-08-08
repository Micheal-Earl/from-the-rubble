// libs
const socket = io(); // client side socket.io lib

// constants
const TILE_SIZE = 16;

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

// intent data structure. Send to server so it knows player intent
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
  let clickX = Math.floor(event.clientX/TILE_SIZE);
  let clickY = Math.floor(event.clientY/TILE_SIZE);
  intent.constructCity.flag = true;
  intent.constructCity.posX = clickX;
  intent.constructCity.posY = clickY;
  socket.emit('intent', intent);
  resetIntent();
  console.log("Click Event Recorded");
});

function resetIntent() {
  intent = {
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
}

// emit that we have a new player starting the client
socket.emit('new player');

// emit player intent every second, maybe change this so intent
// is only emitted when the player wants to do something
/*
setInterval(function() {
  socket.emit('intent', intent);
}, 1000);
*/


/*
// check browsers pixi.js compatibility
let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
// print to console to confirm pixi.js is working
PIXI.utils.sayHello(type)

// define new pixi.js renderer and append it to the div with game id
// magic number 100 is height/width of tilemap, magic number TILE_SIZE is height/width of each tile
// doing this for now because I do not know how to make the view pan with click and drag
let app = new PIXI.Application({width: 150 * TILE_SIZE, height: 150 * TILE_SIZE});
document.getElementById('game').appendChild(app.view);

// make the game render in the entire browser window and auto re-size
//app.renderer.view.style.position = "absolute";
//app.renderer.view.style.display = "block";
//app.renderer.autoResize = true;
//app.renderer.resize(window.innerWidth, window.innerHeight);

const graphics = new PIXI.Graphics();

PIXI.loader
  .add([
    "assets/grass1.png",
    "assets/grass2.png",
    "assets/grass3.png",
    "assets/grass4.png",
    "assets/city.png"
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
  grass4_s = new PIXI.Sprite(PIXI.loader.resources["assets/city.png"].texture);

  socket.emit('client ready');



  // use pixi.js ticker to make game loop?
  app.ticker.add(delta => gameLoop(delta));
}

// runs once per frame, idk
function gameLoop(delta) {
  for(let y = 0; y < map.length; y++) {
    for(let x = 0; x < map[y].length; x++) {
      var pixelX = x * TILE_SIZE;
      var pixelY = y * TILE_SIZE;
      let sprite = new PIXI.Sprite(
        PIXI.loader.resources["assets/" + map[y][x].tileSprite + ".png"].texture
      );
      app.stage.addChild(sprite);
      sprite.position.set(pixelX, pixelY);
    }
  }
}

socket.on('map', function(map) {
  console.log(map);
  console.log("map loaded!");
  for(let y = 0; y < map.map.length; y++) {
    for(let x = 0; x < map.map[y].length; x++) {
      var pixelX = x * TILE_SIZE;
      var pixelY = y * TILE_SIZE;
      let sprite = new PIXI.Sprite(
        PIXI.loader.resources["assets/" + map.map[y][x].tileSprite + ".png"].texture
      );
      app.stage.addChild(sprite);
      sprite.position.set(pixelX, pixelY);
    }
  }
});
*/