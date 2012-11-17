var Game = function Game() {
  this.firstPlayer  = null;
  this.secondPlayer = null;
  this.ready         = false;
};

Game.prototype.preparePlayersShips = function (callback) {
  this.firstPlayer  = new Player();
  this.secondPlayer = new Player();
  this.ready        = true;
  // Position ships for each player
  callback();
};

Game.prototype.isReady = function () {
  return this.ready;
};

Game.prototype.getCurrentPlayer = function () {
  return this.firstPlayer;
}

var World = function MyWorld(callback) {
  callback();
}

var Player = function Player() {
  this.shootAtLocation = function (location, callback) {
    this.lastShot       = location;
    if (isLocationAlreadyUsed(location, this.usedLocations))
      this.lastShotResult = 'boom';
    else
      this.lastShotResult = 'ploof';
    callback();
  };

  var isLocationAlreadyUsed = function (location, usedLocations) {
    var alreadyUsedLocations = usedLocations.filter(function (element) { 
      return element.isSameAs(location);
    });
    return (alreadyUsedLocations.length > 0);
  };

  this.usedLocations = [new Location(1, 0)];
}

var Location = function Location(x, y) {
  this.x = x;
  this.y = y;

  this.isSameAs = function (location) {
    return this.x == location.x && this.y == location.y
  }
}

World.prototype.prepareAGame = function (callback) {
  this.game = new Game();
  this.game.preparePlayersShips(callback);
};

module.exports = { World: World, Location: Location }