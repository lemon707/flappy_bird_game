var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");

var Bird = function() {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.y = 0.5;
  physics.acceleration.y = -2;

  var graphics = new graphicsComponent.BirdGraphicsComponent(this);
  
  this.components = {
    graphics: graphics,
    physics: physics
  };
};

exports.Bird = Bird;