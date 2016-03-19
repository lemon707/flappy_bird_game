var graphicsComponent = require("../components/graphics/coin");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");
var removalComponent = require("../components/removal/removal");
var userInterfaceComponent = require("../components/ui/ui");
var settings = require("../settings");

var Coin = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = coord.x;
  physics.position.y = coord.y;
  physics.velocity.x = -0.2;

  var graphics = new graphicsComponent.CoinGraphicsComponent(this);
  var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
  collision.onCollision = this.onCollision.bind(this);
  var removal = new removalComponent.RemovalComponent(this);
  var ui = new userInterfaceComponent.UserInterfaceComponent(this);

  this.type = 'coin';

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision,
    removal: removal,
    ui: ui
  };
};

Coin.prototype.onCollision = function(entity) {
  console.log('colliding');
};

exports.Coin = Coin;