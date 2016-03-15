var RemovalSystem = function(entities) {
  this.entities = entities;
};

RemovalSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
      var entity = this.entities[i];
      // debugger;
      if(!entity.components.hasOwnProperty('removal')) {
      // if(!'removal' in entity.components) {
        continue;
      }

      if(entity.components.removal.toRemoveAllOfType === true) {
        // delete this.entities[i];
        this.removeAllOfType('pipe');
        // this.entities.splice(i, 1);
        // console.log('this.entities', this.entities)
      }
  }
};

RemovalSystem.prototype.removeAllOfType = function(type) {
  for(var i = 0; i < this.entities.length; i += 1) {
      var entity = this.entities[i];
      // debugger;
      if(entity.type === type) {
        this.entities.splice(i, 1);
        console.log('this.entities',this.entities)
      }
  }
}

exports.RemovalSystem = RemovalSystem;