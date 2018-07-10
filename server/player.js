class Player {
  constructor(id) {
    //this.name = name;
    this.id = id;
    this.wood = 100;

    // have to write some sort of structure to store city info
    this.cities = {
      city1 = {
        name: "",
        built: false,
        posX: NaN,
        posY: NaN,
        upgrades: 0
      },
      city2 = {
        name: "",
        built: false,
        posX: NaN,
        posY: NaN,
        upgrades: 0
      },
      city3 = {
        name: "",
        built: false,
        posX: NaN,
        posY: NaN,
        upgrades: 0
      }
    }
  }
}

module.exports = Player;