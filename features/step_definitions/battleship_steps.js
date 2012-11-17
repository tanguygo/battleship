var World = require('../support/world').World;
var Location = require('../support/world').Location;

var steps = function () {
  this.World = World;

  // First scenario

  this.When(/the players prepare their ships/, function (callback) {  
    this.prepareAGame(callback);
  });

  this.Then(/^the game is ready to play$/, function(callback) {
    if (this.game.isReady())
      callback(null);
    else
      callback(new Error("The game is expected to be ready."));
  });

  // Second scenario

  this.Given(/^the game was made ready to play$/, function(callback) {
    this.prepareAGame(callback);
  });

  this.Then(/^the first player is chosen$/, function(callback) {
    if (this.game.getCurrentPlayer())
      callback(null);
    else
      callback(new Error("The first player can not be chosen."));
  });

  // Third scenario

  this.Given(/^it's my turn to play$/, function(callback) {
    var that = this;
    this.prepareAGame(function (err) {
      if (err)
        return callback(err);
      that.i = that.game.getCurrentPlayer();
      callback(null);
    });
  });

  this.When(/^I shoot at a location and miss$/, function(callback) {
    this.i.shootAtLocation(new Location(1, 2), callback);
  });

  this.Then(/^I get a "(ploof|boom|ka-boom)"$/, function(shotResult, callback) {
    if (shotResult == this.i.lastShotResult)
      callback(null);
    else 
      callback(new Error('Wrong result for shot result'));
  });

  // Fourth scenario

  this.When(/^I shoot at a location and hit a ship$/, function(callback) {
    this.i.shootAtLocation(this.i.usedLocations[0], callback);
  });
}


module.exports = steps
