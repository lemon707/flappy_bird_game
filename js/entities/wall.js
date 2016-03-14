var graphicsComponent = require("../components/graphics/wall");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var settings = require("../settings");

var Wall = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  var size = {
    x: 0.01,
    y: 1
  }
  physics.position.x = coord.x + size.x / 2;
  physics.position.y = coord.y + size.y / 2;

  var graphics = new graphicsComponent.WallGraphicsComponent(this);
  var collision = new collisionComponent.RectCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Wall.prototype.onCollision = function(entity) {
  // console.log("Wall collided with pipe: ", entity);
  //remove pipe
  // entity.components.graphics.entity = null;
  // entity.components.physics.entity = null;
  // entity.components.collision.entity = null;

};

exports.Wall = Wall;