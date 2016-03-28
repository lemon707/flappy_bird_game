var restartBtn = document.getElementsByClassName('restartGame')[0];
var endText = document.getElementsByClassName('endText')[0];

var UserInterfaceSystem = function(entities) {
  this.entities = entities;
  this.score = 0;
  this.life = 3;
};

UserInterfaceSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
      var entity = this.entities[i];
      if(!entity.components.hasOwnProperty('ui')) {
        continue;
      }
      if(entity.components.ui.birdFlownThrough === true) {
        if(entity.type === 'pipe') {
          // save this.score in localstorage
          this.fail();
          if(this.life === 0) {
            this.endGame();
          }
        }
        if(entity.type === 'coin') {
          this.success();
        }
      }
  }
};

UserInterfaceSystem.prototype.success = function() {
  this.score += 1;
  document.getElementsByClassName('score')[0].innerHTML = this.score;
};

UserInterfaceSystem.prototype.fail = function() {
  this.life -= 1;
  document.getElementsByClassName('life')[0].innerHTML = this.life;
};

UserInterfaceSystem.prototype.endGame = function() {
  endText.style.display = 'block';
  restartBtn.style.display = 'block';
};

exports.UserInterfaceSystem = UserInterfaceSystem;