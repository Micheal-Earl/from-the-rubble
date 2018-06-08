class Map {
  constructor(width, height) {
    this.map = []
    this.width = width;
    this.height = height;
    for(let y = 0; y < this.height; y++) {
	    this.map[y] = [];
      for(let x = 0; x < this.width; x++) {
        this.map[y][x] = {
          tileName: "1",
          tileSprite: "grass1",
          tileEntities: {}
        }
      }
    }
  }

  generateSprites() {
    for(let y = 0; y < this.height; y++) {
      for(let x = 0; x < this.width; x++) {
        let rand = Math.floor(Math.random()*100);
        if(rand < 60) {
          this.map[y][x].tileSprite = "grass1";
        } else if(rand < 85) {
          this.map[y][x].tileSprite = "grass2";
        } else if(rand < 95) {
          this.map[y][x].tileSprite = "grass3";
        } else {
          this.map[y][x].tileSprite = "grass4";
        }
      }
    }
  }

  visualizeMap() {
    var mapVisualization = "";
    for(let y = 0; y < this.height; y++) {
      for(let x = 0; x < this.width; x++) {
        mapVisualization += this.map[y][x].tileSprite + ", ";
      }
      console.log(mapVisualization);
      mapVisualization = "";
    }
  }
}

module.exports = Map;