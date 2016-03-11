var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var settings = require("../settings");

var Wall = function(coord) {
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

Wall.prototype.onCollision = function(entity) {
  // console.log("Wall collided with entity: ", entity);
  //remove pipe from entity array
  

};

exports.Wall = Wall;