var graphicsComponent = require("../components/graphics/plate");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var settings = require("../settings");

var Plate = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.size = {
    x: 2,
    y: 0.001
  };
  physics.position.x = coord.x;
  physics.position.y = coord.y;

  var graphics = new graphicsComponent.PlateGraphicsComponent(this);
  var collision = new collisionComponent.RectCollisionComponent(this, physics.size);
  collision.onCollision = this.onCollision.bind(this);

  this.type = 'plate';
  
  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Plate.prototype.onCollision = function(entity) {
  // console.log("Plate collided with bird: ", entity);
};

exports.Plate = Plate;