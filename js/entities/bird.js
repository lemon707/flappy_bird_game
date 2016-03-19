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
  
  this.type = 'bird';
  
  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Bird.prototype.onCollision = function(entity) {
  //reset bird position to center and remove current pipes
  if(entity.components.hasOwnProperty('removal')) {
    if(entity.type === 'pipe') {
      entity.components.removal.toRemoveAllOfType = true;
    }
    if(entity.type === 'coin') {
      console.log('entity',entity.type);
      entity.components.removal.toRemove = true;
    }
  }
  if(entity.components.hasOwnProperty('ui')) {
    entity.components.ui.birdFlownThrough = true;
  }
  this.components.physics.position.x = 0;
  this.components.physics.position.y = 0.5;
  this.components.physics.velocity.y = 0;
  this.components.physics.acceleration.y = -2;
  
};

exports.Bird = Bird;