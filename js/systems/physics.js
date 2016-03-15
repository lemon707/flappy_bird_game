var collisionSystem = require('./collision');
var removalSystem = require('./removal');
var userInterfaceSystem = require('./ui');

var PhysicsSystem = function(entities) {
  this.entities = entities;
  this.collisionSystem = new collisionSystem.CollisionSystem(entities);
  this.removalSystem = new removalSystem.RemovalSystem(entities);
  this.userInterfaceSystem = new userInterfaceSystem.UserInterfaceSystem(entities);
};

PhysicsSystem.prototype.run = function() {
  window.setInterval(this.tick.bind(this), 1000/60);
};

PhysicsSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
    var entity = this.entities[i];
    if(!entity.components.hasOwnProperty('physics')) {
      continue;
    }
    entity.components.physics.update(1/60);
  }
  this.collisionSystem.tick();
  this.userInterfaceSystem.tick();
  this.removalSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;
