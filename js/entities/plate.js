var graphicsComponent = require("../components/graphics/plate");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var settings = require("../settings");

var Plate = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  var size = {
    x: 2,
    y: 0.1
  }
  physics.position.x = coord.x + 1;
  physics.position.y = coord.y + 0.05;

  var graphics = new graphicsComponent.PlateGraphicsComponent(this);
  var collision = new collisionComponent.RectCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Plate.prototype.onCollision = function(entity) {
  // console.log("Plate collided with bird: ", entity);
  //reset bird position
  // entity.components.physics.position.x = 0;
  // entity.components.physics.position.y = 0.5;
};

exports.Plate = Plate;