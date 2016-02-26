var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");

var Pipe = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = coord.x;
  physics.position.y = coord.y;
  physics.acceleration.x = -0.1;

  var graphics = new graphicsComponent.PipeGraphicsComponent(this);
  
  this.components = {
    graphics: graphics,
    physics: physics
  };
};

exports.Pipe = Pipe;
