var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");
var settings = require("../settings");

var Bird = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = coord.x;
  physics.position.y = 0.5;
  physics.acceleration.y = -2;

  var graphics = new graphicsComponent.BirdGraphicsComponent(this);
  var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
  collision.onCollision = this.onCollision.bind(this);
  
  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Bird.prototype.onCollision = function(entity) {
  //reset bird position to center and remove current pipes
  if(entity.type === 'pipe') {
    entity.components.removal.toRemoveAllOfType = true;
  }
  this.components.physics.position.x = 0;
  this.components.physics.position.y = 0.5;
  this.components.physics.velocity.y = 0;
  this.components.physics.acceleration.y = -2;
  
};

exports.Bird = Bird;