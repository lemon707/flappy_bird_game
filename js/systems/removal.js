var RemovalSystem = function(entities) {
  this.entities = entities;
};

RemovalSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
      var entity = this.entities[i];
      if(!entity.components.hasOwnProperty('removal')) {
        continue;
      }
      if(entity.components.removal.toRemoveCurrentPair === true) {
        this.toRemoveCurrentPair('pipe');
      }
      if(entity.components.removal.toRemoveAllOfType === true) {
        this.removeAllOfType('pipe');
      }
  }
};

RemovalSystem.prototype.toRemoveCurrentPair = function(type) {
  for(var i = this.entities.length - 1; i > 0; i -= 1) {
      var entity = this.entities[i];
      if(entity.type === type) {
        this.entities.splice(i, 1);
      }
  }
};

RemovalSystem.prototype.removeAllOfType = function(type) {
  for(var i = this.entities.length - 1; i > 0; i -= 1) {
      var entity = this.entities[i];
      if(entity.type === type) {
        this.entities.splice(i, 1);
      }
  }
};

exports.RemovalSystem = RemovalSystem;