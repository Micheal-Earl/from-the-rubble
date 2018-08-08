class Player {
  constructor(id) {
    this.name = id;
    this.id = id;
    this.wood = 100;
    this.totalCities = 0;
    this.totalUpgrades = 0;
    this.woodPerTick = (this.totalCities * 5) + this.totalUpgrades;

    // have to write some sort of structure to store city info
    this.cities = {
      city1: {
        name: "",
        built: false,
        posX: NaN,
        posY: NaN,
        upgrades: 0
      },
      city2: {
        name: "",
        built: false,
        posX: NaN,
        posY: NaN,
        upgrades: 0
      },
      city3: {
        name: "",
        built: false,
        posX: NaN,
        posY: NaN,
        upgrades: 0
      }
    }
  }

  tick() {
    this.wood += this.woodPerTick
  }

  changePlayerName(newName) {
    this.name = newName;
  }
}

module.exports = Player;