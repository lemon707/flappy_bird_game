var collisionSystem = require('./collision');

var PhysicsSystem = function(entities) {
  this.entities = entities;
  this.collisionSystem = new collisionSystem.CollisionSystem(entities);
};

PhysicsSystem.prototype.run = function() {
  window.setInterval(this.tick.bind(this), 1000/60);
  // var birdNotMoving = this.entities[1];
  // birdNotMoving.components.physics.acceleration = 0;
};

PhysicsSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
    var entity = this.entities[i];
    if(!'physics' in entity.components) {
      continue;
    }

    entity.components.physics.update(1/60);
  }
  
  this.collisionSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;
