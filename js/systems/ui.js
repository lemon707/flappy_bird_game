var UserInterfaceSystem = function(entities) {
  this.entities = entities;
  this.count = 0;
  this.score = 0;
};

UserInterfaceSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
      var entity = this.entities[i];
      if(!entity.components.hasOwnProperty('ui')) {
        continue;
      }
      if(entity.components.ui.birdFlownThrough === true) {
        if(entity.type === 'pipe') {
          this.countPipesFlownThrough('pipe');
          this.countScore('minus');
        }
        if(entity.type === 'coin') {
          this.countScore('plus');
        }
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

UserInterfaceSystem.prototype.countScore = function(math) {
  if(math === 'plus') {
    this.score += 1;
  } else {
    this.score -= 1;
  }
  document.getElementsByClassName('score')[0].innerHTML = this.score;
};

exports.UserInterfaceSystem = UserInterfaceSystem;