var graphicsComponent = require("../components/graphics/wall");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var settings = require("../settings");

var Wall = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.size = {
    x: 0.001,
    y: 1
  };
  physics.position.x = coord.x;
  physics.position.y = coord.y;

  var graphics = new graphicsComponent.WallGraphicsComponent(this);
  var collision = new collisionComponent.RectCollisionComponent(this, physics.size);
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Wall.prototype.onCollision = function(entity) {
  if(entity.components.hasOwnProperty('removal')) {
    entity.components.removal.toRemoveCurrentPair = true;
  }
};

exports.Wall = Wall;