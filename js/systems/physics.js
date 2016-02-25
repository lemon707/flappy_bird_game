var PhysicsSystem = function(entities) {
  this.entities = entities;
};

PhysicsSystem.prototype.run = function() {
  window.setInterval(this.tick.bind(this), 1000/60);
};

PhysicsSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
    var entity = this.entities[i];
    if(!'physics' in entity.components) {
      continue;
    }

    entity.components.physics.update(1/60);
  }
};

exports.PhysicsSystem = PhysicsSystem;