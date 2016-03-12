var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var settings = require("../settings");

var Pipe = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  var size = {
    x: 0.3,
    y: 0.3 
  };
  physics.position.x = coord.x + size.x/2;
  physics.position.y = coord.y + size.y/2;
  physics.velocity.x = -0.5;
  
  var graphics = new graphicsComponent.PipeGraphicsComponent(this);
  var collision = new collisionComponent.RectCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Pipe.prototype.onCollision = function(entity) {
  // console.log('bird.position.y: ',entity.components.physics.position.y)
  // console.log("Pipe collided with entity: ", entity);
  //remove all current pipes

  

};

exports.Pipe = Pipe;
