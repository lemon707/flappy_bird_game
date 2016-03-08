var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var settings = require("../settings");

var Plate = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = coord.x;
  physics.position.y = coord.y;

  var collision = new collisionComponent.RectCollisionComponent(this, 2);
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    physics: physics,
    collision: collision
  };
};

Plate.prototype.onCollision = function(entity) {
  console.log("Plate collided with entity: ", entity);
  //reset bird position, remove current pipes
  

};

exports.Plate = Plate;