var UserInterfaceSystem = function(entities) {
  this.entities = entities;
  this.score = 0;
};

var coinSound = new Audio('./sound/coin.wav');
var bumpSound = new Audio('./sound/bump.wav');

UserInterfaceSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
      var entity = this.entities[i];
      if(!entity.components.hasOwnProperty('ui')) {
        continue;
      }
      if(entity.components.ui.birdFlownThrough === true) {
        if(entity.type === 'pipe') {
          // save this.score in localstorage
          this.endGame();
        }
        if(entity.type === 'coin') {
          this.success();
        }
      }
  }
};

UserInterfaceSystem.prototype.success = function() {
  //play money sound
  coinSound.play();
  this.score += 1;
  document.getElementsByClassName('score')[0].innerHTML = this.score;
};

UserInterfaceSystem.prototype.endGame = function() {
  //play ending sound
  bumpSound.play();
  console.log('game over!')
};

exports.UserInterfaceSystem = UserInterfaceSystem;