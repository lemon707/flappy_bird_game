var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");
var settings = require("../settings");
  var trigger = false;

var Bird = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = coord.x;
  physics.position.y = 0.5;
  // physics.acceleration.y = -2;

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
  // console.log('bird position.x',this.components.physics.position.x)
  // trigger = false;
  if(trigger === false) {
  console.log("pipe.position.x: ", entity.components.physics.position.x);
  console.log("pipe.position.y: ", entity.components.physics.position.y);
  console.log('bird position.y',this.components.physics.position.y)
    console.log('trigger false!')
    trigger = true;
  }
  // console.log('bird position.y',this.components.physics.position.y)
  // //reset bird position to center
  // this.components.physics.position.x = 0;
  // this.components.physics.position.y = 0;
  
};

exports.Bird = Bird;