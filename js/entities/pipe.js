var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var removalComponent = require("../components/removal/removal");

var settings = require("../settings");

var Pipe = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.size = {
    x: 0.3,
    y: 0.3 
  };
  physics.position.x = coord.x;
  physics.position.y = coord.y;
  physics.velocity.x = -0.5;
  
  var graphics = new graphicsComponent.PipeGraphicsComponent(this);
  var collision = new collisionComponent.RectCollisionComponent(this, physics.size);
  collision.onCollision = this.onCollision.bind(this);
  var removal = new removalComponent.RemovalComponent(this);

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision,
    removal: removal
  };
};

Pipe.prototype.onCollision = function(entity) {
  // console.log('bird.position.y: ',entity.components.physics.position.y)
  // console.log("Pipe collided with entity: ", entity);
  //remove all current pipes
  
};

exports.Pipe = Pipe;
