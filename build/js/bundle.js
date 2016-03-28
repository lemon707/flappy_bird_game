(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CircleCollisionComponent = function(entity, radius) {
  this.entity = entity;
  this.radius = radius;
  this.type = 'circle';
};

CircleCollisionComponent.prototype.collidesWith = function(entity) {
  if(entity.components.collision.type === 'circle') {
    return this.collideCircle(entity);
  } else if(entity.components.collision.type === 'rect') {
    return this.collideRect(entity);
  }
  return false;
};

CircleCollisionComponent.prototype.collideCircle = function(entity) {
  var positionA = this.entity.components.physics.position;
  var positionB = entity.components.physics.position;

  var radiusA = this.radius;
  var radiusB = entity.components.collision.radius;

  var diff = {x: positionA.x - positionB.x,
    y: positionA.y - positionB.y};

  var distanceSquared = diff.x * diff.x + diff.y * diff.y;
  var radiusSum = radiusA + radiusB;

  return distanceSquared < radiusSum * radiusSum;
};

CircleCollisionComponent.prototype.collideRect = function(entity) {
  var clamp = function(value, low, high) {
    if(value < low) {
      return low;
    }
    if(value > high) {
      return high;
    }
    return value;
  };

  var positionA = this.entity.components.physics.position;
  var positionB = entity.components.physics.position;
  var sizeB = entity.components.collision.size;

  var closest = {
    x: clamp(positionA.x, positionB.x - sizeB.x / 2, positionB.x + sizeB.x / 2),
    y: clamp(positionA.y, positionB.y - sizeB.y / 2, positionB.y + sizeB.y / 2)
  };

  var radiusA = this.radius;

  var diff = {x: positionA.x - closest.x, y:positionA.y - closest.y};

  var distanceSquared = diff.x * diff.x + diff.y * diff.y;
  return distanceSquared < radiusA * radiusA;
};

exports.CircleCollisionComponent = CircleCollisionComponent;
},{}],2:[function(require,module,exports){
var RectCollisionComponent = function(entity, size) {
  this.entity = entity;
  this.size = size;
  this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function(entity) {
  if(entity.components.collision.type === 'circle') {
    return this.collideCircle(entity);
  } else if(entity.components.collision.type === 'rect') {
    return this.collideRect(entity);
  }
  return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
  return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function(entity) {
  var positionA = this.entity.components.physics.position;
  var positionB = entity.components.physics.position;

  var sizeA = this.size;
  var sizeB = entity.components.collision.size;

  var leftA = positionA.x - sizeA.x / 2;
  var rightA = positionA.x + sizeA.x / 2;
  var bottomA = positionA.y - sizeA.y / 2;
  var topA = positionA.y + sizeA.y / 2;

  var leftB = positionB.x - sizeB.x / 2;
  var rightB = positionB.x + sizeB.x / 2;
  var bottomB = positionB.y - sizeB.y / 2;
  var topB = positionB.y + sizeB.y / 2;

  return !(leftA > rightB || leftB > rightA || bottomA > topB || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;
},{}],3:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
  this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  var image_bird = document.getElementsByClassName("img_bird")[0];

  context.save();
  context.translate(position.x, position.y);
  context.beginPath();
  context.arc(0, 0, 0.02, 0, 2 * Math.PI);
  context.fillStyle = 'transparent';
  context.fill();
  // context.rotate(); how to rotate the bird?
  context.drawImage(image_bird,-0.05,-0.05,0.1,0.1);
  context.closePath();
  // drawing out the center of the circle
  // context.fillStyle = 'red';
  // context.fillRect(0,0,0.005,0.005);
  context.restore();

};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],4:[function(require,module,exports){
var CoinGraphicsComponent = function(entity) {
  this.entity = entity;
};

CoinGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  var image_coin = document.getElementsByClassName("img_coin")[0];

  context.save();
  context.translate(position.x, position.y);
  context.beginPath();
  // context.fillStyle = '#ffd700';
  context.arc(0, 0, 0.01, 0, 2 * Math.PI);
  context.fillStyle = 'transparent';
  context.fill();
  context.drawImage(image_coin,-0.015,-0.015,0.035,0.035);
  context.closePath();
  // drawing out the center of the circle
  // context.fillStyle = 'black';
  // context.fillRect(0,0,0.005,0.005);
  context.restore();

};

exports.CoinGraphicsComponent = CoinGraphicsComponent;
},{}],5:[function(require,module,exports){
var PipeGraphicsComponent = function(entity) {
  this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  var size = this.entity.components.physics.size;
  var vector = this.entity.components.physics.vector;
  var image_pipe = document.getElementsByClassName("img_pipe")[0];

  context.save();
  context.translate(position.x - size.x / 2, position.y - size.y / 2);
  context.beginPath();
  context.rect(0, 0, size.x, size.y);
  context.fillStyle = 'transparent';
  context.fill();
  context.drawImage(image_pipe,0,0, 0.3,0.3);
  // drawing out the center of the pipe
  // context.fillStyle = 'red';
  // context.fillRect(size.x / 2,size.y / 2,0.01,0.01);
  context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],6:[function(require,module,exports){
var PlateGraphicsComponent = function(entity) {
  this.entity = entity;
};

PlateGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  var size = this.entity.components.physics.size;
  context.save();
  context.translate(position.x - size.x / 2, position.y - size.y / 2);
  context.beginPath();
  context.rect(0, 0, size.x, size.y);
  context.fillStyle = 'transparent';
  context.fill();
  context.restore();
};

exports.PlateGraphicsComponent = PlateGraphicsComponent;
},{}],7:[function(require,module,exports){
var WallGraphicsComponent = function(entity) {
  this.entity = entity;
};

WallGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  var size = this.entity.components.physics.size;
  context.save();
  context.translate(position.x - size.x / 2, position.y - size.y / 2);
  context.beginPath();
  context.rect(0, 0, size.x, size.y);
  context.fillStyle = 'transparent';
  context.fill();
  context.restore();
};

exports.WallGraphicsComponent = WallGraphicsComponent;
},{}],8:[function(require,module,exports){
var PhysicsComponent = function(entity) {
  this.entity = entity;

  this.position = {
    x: 0,
    y: 0
  };

  this.velocity = {
    x: 0,
    y: 0
  };

  this.acceleration = {
    x: 0,
    y: 0
  };
};

PhysicsComponent.prototype.update = function(delta) {
  this.velocity.x += this.acceleration.x * delta;
  this.velocity.y += this.acceleration.y * delta;

  this.position.x += this.velocity.x * delta;
  this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;
},{}],9:[function(require,module,exports){
var RemovalComponent = function(entity) {
  this.entity = entity;
  this.toRemove = false;
  this.toRemoveAllOfType = false;
};

exports.RemovalComponent = RemovalComponent;
},{}],10:[function(require,module,exports){
var SoundComponent = function(entity) {
  this.entity = entity;
  this.birdFlownThrough = false;
};

exports.SoundComponent = SoundComponent;
},{}],11:[function(require,module,exports){
var UserInterfaceComponent = function(entity) {
  this.entity = entity;
  this.birdFlownThrough = false;
};

exports.UserInterfaceComponent = UserInterfaceComponent;
},{}],12:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");
var settings = require("../settings");

var Bird = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = coord.x;
  physics.position.y = 0.5;
  physics.acceleration.y = -2;

  var graphics = new graphicsComponent.BirdGraphicsComponent(this);
  var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
  collision.onCollision = this.onCollision.bind(this);
  
  this.type = 'bird';
  
  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Bird.prototype.onCollision = function(entity) {
  if(entity.components.hasOwnProperty('removal')) {
    if(entity.type === 'pipe') {
      entity.components.removal.toRemoveAllOfType = true;
    }
    if(entity.type === 'coin') {
      entity.components.removal.toRemove = true;
    }
  }
  if(entity.components.hasOwnProperty('ui')) {
    entity.components.ui.birdFlownThrough = true;
  }
  if(entity.type === 'plate') {
    this.components.physics.position.y = 0.5;
    this.components.physics.velocity.y = 0;
  }
};

exports.Bird = Bird;
},{"../components/collision/circle":1,"../components/graphics/bird":3,"../components/physics/physics":8,"../settings":19}],13:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/coin");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");
var removalComponent = require("../components/removal/removal");
var userInterfaceComponent = require("../components/ui/ui");
var soundComponent = require("../components/sound/sound");
var settings = require("../settings");

var Coin = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = coord.x;
  physics.position.y = coord.y;
  physics.velocity.x = -0.2;

  var graphics = new graphicsComponent.CoinGraphicsComponent(this);
  var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
  collision.onCollision = this.onCollision.bind(this);
  var removal = new removalComponent.RemovalComponent(this);
  var ui = new userInterfaceComponent.UserInterfaceComponent(this);
  var sound = new soundComponent.SoundComponent(this);

  this.type = 'coin';

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision,
    removal: removal,
    ui: ui,
    sound: sound
  };
};

Coin.prototype.onCollision = function(entity) {
};

exports.Coin = Coin;
},{"../components/collision/circle":1,"../components/graphics/coin":4,"../components/physics/physics":8,"../components/removal/removal":9,"../components/sound/sound":10,"../components/ui/ui":11,"../settings":19}],14:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var removalComponent = require("../components/removal/removal");
var userInterfaceComponent = require("../components/ui/ui");
var soundComponent = require("../components/sound/sound");
var settings = require("../settings");

var Pipe = function (coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.size = {
    x: 0.3,
    y: 0.3 
  };
  physics.position.x = coord.x;
  physics.position.y = coord.y;
  physics.velocity.x = -0.5;
  physics.vector = coord.pipeVector;

  var graphics = new graphicsComponent.PipeGraphicsComponent(this);
  var collision = new collisionComponent.RectCollisionComponent(this, physics.size);
  collision.onCollision = this.onCollision.bind(this);
  var removal = new removalComponent.RemovalComponent(this);
  var ui = new userInterfaceComponent.UserInterfaceComponent(this);
  var sound = new soundComponent.SoundComponent(this);

  this.type = 'pipe';
  
  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision,
    removal: removal,
    ui: ui,
    sound: sound
  };
};

Pipe.prototype.onCollision = function(entity) {
  // console.log('bird.position.y: ',entity.components.physics.position.y)
  // console.log("Pipe collided with entity: ", entity);
  //remove all current pipes
  
};

exports.Pipe = Pipe;

},{"../components/collision/rect":2,"../components/graphics/pipe":5,"../components/physics/physics":8,"../components/removal/removal":9,"../components/sound/sound":10,"../components/ui/ui":11,"../settings":19}],15:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/plate");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var settings = require("../settings");

var Plate = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.size = {
    x: 2,
    y: 0.001
  };
  physics.position.x = coord.x;
  physics.position.y = coord.y;

  var graphics = new graphicsComponent.PlateGraphicsComponent(this);
  var collision = new collisionComponent.RectCollisionComponent(this, physics.size);
  collision.onCollision = this.onCollision.bind(this);

  this.type = 'plate';
  
  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Plate.prototype.onCollision = function(entity) {
  // console.log("Plate collided with bird: ", entity);
};

exports.Plate = Plate;
},{"../components/collision/rect":2,"../components/graphics/plate":6,"../components/physics/physics":8,"../settings":19}],16:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/wall");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var settings = require("../settings");

var Wall = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.size = {
    x: 0.001,
    y: 1
  };
  physics.position.x = coord.x;
  physics.position.y = coord.y;

  var graphics = new graphicsComponent.WallGraphicsComponent(this);
  var collision = new collisionComponent.RectCollisionComponent(this, physics.size);
  collision.onCollision = this.onCollision.bind(this);

  this.type = 'wall';
  
  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Wall.prototype.onCollision = function(entity) {
  if(entity.components.hasOwnProperty('removal')) {
    entity.components.removal.toRemove = true;
  }
};

exports.Wall = Wall;
},{"../components/collision/rect":2,"../components/graphics/wall":7,"../components/physics/physics":8,"../settings":19}],17:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var coin = require('./entities/coin');
var plate = require('./entities/plate');
var wall = require('./entities/wall');

var intervalID;

var FlappyBird = function() {
  this.entities = [new bird.Bird({x:0}), new plate.Plate({x:0,y:0}), new plate.Plate({x:0,y:1}), new wall.Wall({x:-1.3,y:0.5}), new pipe.Pipe({x:0.85,y:0.15}), new pipe.Pipe({x:0.85,y:0.85})];
  this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
  this.physics = new physicsSystem.PhysicsSystem(this.entities);
  this.input = new inputSystem.InputSystem(this.entities);
};

FlappyBird.prototype.repeater = function() {
  var pipeArr = [new pipe.Pipe({x:0.85,y:0.15,pipeVector:0}), new pipe.Pipe({x:0.85,y:0.85})];
  var coinArr = [new coin.Coin({x:0.4,y:0.6}), new coin.Coin({x:0.7,y:0.4}), new coin.Coin({x:0.9, y:0.55})];
  var that = this; //this is what solves the whole problem - lexical scoping
  pipeArr.forEach(function(p) {
    that.entities.push(p);
  });
  coinArr.forEach(function(p) {
    that.entities.push(p);
  });
};

FlappyBird.prototype.pause = function() {
  this.graphics.pause();
  this.physics.pause();
  this.input.pause();

  window.clearInterval(intervalID);
};

FlappyBird.prototype.run = function() {
  this.graphics.run();
  this.physics.run();
  this.input.run();
  
  intervalID = window.setInterval(this.repeater.bind(this), 2000);
};

exports.FlappyBird = FlappyBird;
},{"./entities/bird":12,"./entities/coin":13,"./entities/pipe":14,"./entities/plate":15,"./entities/wall":16,"./systems/graphics":21,"./systems/input":22,"./systems/physics":23}],18:[function(require,module,exports){
var flappyBird = require('./flappy_bird');

var app = new flappyBird.FlappyBird();

var playBtn = document.getElementsByClassName('start-game')[0],
    playSound = new Audio('./sound/start-music.mp3'),
    soundMuteIcon = document.getElementsByClassName('fa-ban')[0],
    instructionText = document.getElementsByClassName('instruction'),
    soundControl = document.getElementsByClassName('sound-control')[0],
    pauseText = document.getElementsByClassName('pause-text')[0],
    restartBtn = document.getElementsByClassName('restart-game')[0],
    coinImg = document.getElementsByClassName('img_coin_start_image')[0],
    birdImg = document.getElementsByClassName('img_start_image_bird')[0],
    gameTitle = document.getElementsByClassName('game-title')[0],
    numCounter = document.getElementsByClassName('counter')[0],
    highestScore = document.getElementsByClassName('highest-score')[0],
    counter = 2,
    mute = false,
    paused = false,
    countDown = countDown,
    toggleGameState = toggleGameState,
    toggleSound = toggleSound,
    endGame = endGame,
    startNewGame = startNewGame;

    function countDown() {
        counter -= 1;
        numCounter.innerHTML = counter;
    }

    function toggleGameState() {
        paused = !paused;
        if(paused === false) {
            pauseText.style.display = 'none';
            app.run();
        } else {
            pauseText.style.display = 'block';
            app.pause();
        }
    }

    function toggleSound() {
        mute = !mute;
        if(mute === true) {
            soundMuteIcon.style.display = 'block';
            playSound.volume = 0;
        } else {
            soundMuteIcon.style.display = 'none';
            playSound.volume = 0.5;
        }
    }

    function endGame() {
        //TODO:
        //show current score from localstorage
        //pause and
        //show start new game
        // app.pause();
    }

    function startNewGame(e) {
        e.preventDefault();
        playSound.pause();
        playSound.currentTime = 0;
        this.style.display = 'none';
        birdImg.style.display = 'none';
        coinImg.style.display = 'none';
        gameTitle.style.display = 'none';
        numCounter.style.display = 'block';
        window.setInterval(function(){
            countDown();
            if(counter === 0) {
                numCounter.innerHTML = 'START!';
                window.setTimeout(function(){
                    numCounter.style.display = 'none';
                    app.run();
                },1000);
            }
        },1000);
    }

soundControl.addEventListener('click', function(e) {
    e.preventDefault();
    toggleSound();
});

playSound.volume = 0.5;
playSound.play();

//start new game or reset to a new game
playBtn.addEventListener('click', startNewGame);

// TODO:
// restartBtn.addEventListener('click', startNewGame);

//pause game on pressing space
//give option to reset game or restart
document.onkeypress = function(e){
    e.preventDefault();
    if(e.keyCode === 0 || e.keyCode === 32) {
        e.preventDefault();
        toggleGameState();
    }
};

//restart game after pause
restartBtn.addEventListener('click', function(e) {
    e.preventDefault();
    this.style.display = 'none';
    numCounter.style.display = 'block';
    countDown();
    app.run();
});

//show highest score by accessing localstorage and taking Math.max of array
// highestScore = 
},{"./flappy_bird":17}],19:[function(require,module,exports){
//toggle sound
//adjust velocity

},{}],20:[function(require,module,exports){
var CollisionSystem = function(entities) {
  this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
    var entityA = this.entities[i];
    if(!entityA.components.hasOwnProperty('collision')) {
      continue;
    }
    for(var j = i + 1; j < this.entities.length; j += 1) {
      var entityB = this.entities[j];
      if(!entityB.components.hasOwnProperty('collision')) {
        continue;
      }
      if(!entityA.components.collision.collidesWith(entityB)) {
        continue;
      }
      if(entityA.components.collision.onCollision) {
        entityA.components.collision.onCollision(entityB);
      }
      if(entityB.components.collision.onCollision) {
        entityB.components.collision.onCollision(entityA);
      }
    }
  }
};

exports.CollisionSystem = CollisionSystem;
},{}],21:[function(require,module,exports){
var GraphicsSystem = function(entities) {
  this.entities = entities;
  this.canvas = document.getElementById('main-canvas');
  this.context = this.canvas.getContext('2d');
};

var requestID;

GraphicsSystem.prototype.run = function() {
  requestID = window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.pause = function() {
  window.cancelAnimationFrame(requestID);
};

GraphicsSystem.prototype.tick = function() {

  if(this.canvas.width != this.canvas.offsetWidth ||
    this.canvas.height != this.canvas.offsetHeight) {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  this.context.clearRect(0,0,this.canvas.width, this.canvas.height);

  this.context.save();
  this.context.translate(this.canvas.width / 2, this.canvas.height);
  this.context.scale(this.canvas.height, -this.canvas.height);

  for(var i = 0; i < this.entities.length; i += 1) {
    var entity = this.entities[i];
    if(!entity.components.hasOwnProperty('graphics')) {
      continue;
    }
    entity.components.graphics.draw(this.context);
  }

  this.context.restore();

  window.requestAnimationFrame(this.tick.bind(this));

};

exports.GraphicsSystem = GraphicsSystem;
},{}],22:[function(require,module,exports){
var InputSystem = function(entities) {
  this.entities = entities;
  this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function(event) {
  this.canvas.addEventListener('click', this.onClick.bind(this));
  this.canvas.addEventListener('touchstart', this.onTap.bind(this), false);
};

InputSystem.prototype.pause = function() {
  this.canvas.removeEventListener('click', this.onClick.bind(this));
};

InputSystem.prototype.onClick = function() {
  var bird = this.entities[0];
  bird.components.physics.velocity.y = 0.7;
};

InputSystem.prototype.onTap = function(event) {
  event.preventDefault();
  var bird = this.entities[0];
  bird.components.physics.velocity.y = 0.7;
};

exports.InputSystem = InputSystem;

},{}],23:[function(require,module,exports){
var collisionSystem = require('./collision');
var soundSystem = require('./sound');
var removalSystem = require('./removal');
var userInterfaceSystem = require('./ui');
var intervalID;

var PhysicsSystem = function(entities) {
  this.entities = entities;
  this.collisionSystem = new collisionSystem.CollisionSystem(entities);
  this.soundSystem = new soundSystem.SoundSystem(entities);
  this.removalSystem = new removalSystem.RemovalSystem(entities);
  this.userInterfaceSystem = new userInterfaceSystem.UserInterfaceSystem(entities);
};

PhysicsSystem.prototype.run = function() {
  intervalID = window.setInterval(this.tick.bind(this), 1000/60);
};

PhysicsSystem.prototype.pause = function() {
  window.clearInterval(intervalID);
};

PhysicsSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
    var entity = this.entities[i];
    if(!entity.components.hasOwnProperty('physics')) {
      continue;
    }
    entity.components.physics.update(1/60);
  }
  this.collisionSystem.tick();
  this.soundSystem.tick();
  this.userInterfaceSystem.tick();
  this.removalSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;

},{"./collision":20,"./removal":24,"./sound":25,"./ui":26}],24:[function(require,module,exports){
var RemovalSystem = function(entities) {
  this.entities = entities;
};

RemovalSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
      var entity = this.entities[i];
      if(!entity.components.hasOwnProperty('removal')) {
        continue;
      }
      if(entity.components.removal.toRemove === true) {
        this.toRemove(i);
      }
      if(entity.components.removal.toRemoveAllOfType === true) {
        this.removeAllOfType('pipe');
      }
  }
};

RemovalSystem.prototype.toRemove = function(currentIndex) {
  this.entities.splice(currentIndex, 1);
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
},{}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
var restartBtn = document.getElementsByClassName('restart-game')[0];
var endText = document.getElementsByClassName('end-text')[0];

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
},{}]},{},[18]);
