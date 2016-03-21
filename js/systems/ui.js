var gameSoundControl = document.getElementsByClassName('soundControl')[0];
var gameSoundMuteIcon = document.getElementsByClassName('fa-ban')[0];
var coinSound = new Audio('./sound/coin.wav');
var bumpSound = new Audio('./sound/bump.wav');
var endSound = new Audio('./sound/game-over.mp3');
var mute = false;
var endText = document.getElementsByClassName('endText')[0];

coinSound.volume = 0.5;
bumpSound.volume = 0.5;
endSound.volume = 0.5;

var UserInterfaceSystem = function(entities) {
  this.entities = entities;
  this.score = 0;
  this.life = 3;
};

var toggleGameSound = function() {
    mute = !mute;
    if(mute === true) {
        gameSoundControl.style.display = 'block';
        coinSound.volume = 0;
        bumpSound.volume = 0;
        endSound.volume = 0;
    } else {
        gameSoundControl.style.display = 'none';
        coinSound.volume = 0.5;
        bumpSound.volume = 0.5;
        endSound.volume = 0.5;
    }
};

gameSoundControl.addEventListener('click', function(e) {
    e.preventDefault();
    toggleGameSound();
});


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
  coinSound.play();
  this.score += 1;
  document.getElementsByClassName('score')[0].innerHTML = this.score;
};

UserInterfaceSystem.prototype.fail = function() {
  bumpSound.play();
  this.life -= 1;
  document.getElementsByClassName('life')[0].innerHTML = this.life;
};

UserInterfaceSystem.prototype.endGame = function() {
  endSound.play();
  endText.style.display = 'block';
};

exports.UserInterfaceSystem = UserInterfaceSystem;