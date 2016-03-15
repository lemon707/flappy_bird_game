var UserInterfaceSystem = function(entities) {
  this.entities = entities;
  this.count = 0;
};

UserInterfaceSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
      var entity = this.entities[i];
      if(!entity.components.hasOwnProperty('ui')) {
        continue;
      }
      if(entity.components.ui.birdFlownThrough === true) {
        this.countPipesFlownThrough('pipe');
      }
  }
};

UserInterfaceSystem.prototype.countPipesFlownThrough = function(type) {
  for(var i = this.entities.length - 1; i > 0; i -= 1) {
      var entity = this.entities[i];
      if(entity.type === type) {
        this.count += 1;
        document.getElementsByClassName('numPipes')[0].innerHTML = this.count;
      }
  }
};

exports.UserInterfaceSystem = UserInterfaceSystem;