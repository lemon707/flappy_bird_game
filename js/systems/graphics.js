var GraphicsSystem = function(entities) {
  this.entities = entities;
};

GraphicsSystem.prototype.run = function() {
  for (var i = 0; i < 5; i += 1) {
    this.tick();
  }
};

GraphicsSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
    var entity = this.entities[i];
    if('graphics' in entity.components) {
      entity.components.graphics.draw(this.context);
    }
  }
};

exports.GraphicsSystem = GraphicsSystem;