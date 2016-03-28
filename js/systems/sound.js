var gameSoundControl = document.getElementsByClassName('sound-control')[0];
var gameSoundMuteIcon = document.getElementsByClassName('fa-ban')[0];
var coinSound = new Audio('./sound/coin.wav');
var bumpSound = new Audio('./sound/bump.wav');
var endSound = new Audio('./sound/game-over.mp3');
var mute = false;

coinSound.volume = 0.5;
bumpSound.volume = 0.5;
endSound.volume = 0.5;

var toggleGameSound = function() {
    mute = !mute;
    if(mute === true) {
        gameSoundMuteIcon.style.display = 'block';
        coinSound.volume = 0;
        bumpSound.volume = 0;
        endSound.volume = 0;
    } else {
        gameSoundMuteIcon.style.display = 'none';
        coinSound.volume = 0.5;
        bumpSound.volume = 0.5;
        endSound.volume = 0.5;
    }
};

gameSoundControl.addEventListener('click', function(e) {
    e.preventDefault();
    toggleGameSound();
});

var SoundSystem = function(entities) {
  this.entities = entities;
  this.life = 3;
};

SoundSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
      var entity = this.entities[i];
      if(!entity.components.hasOwnProperty('sound')) {
        continue;
      }
      if(entity.components.ui.birdFlownThrough === true) {
        if(entity.type === 'pipe') {
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

SoundSystem.prototype.success = function() {
  coinSound.play();
};

SoundSystem.prototype.fail = function() {
  this.life -= 1;
  bumpSound.play();
};

SoundSystem.prototype.endGame = function() {
  endSound.play();
};

exports.SoundSystem = SoundSystem;