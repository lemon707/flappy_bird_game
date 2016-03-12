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
  var radiusB = entity.components.collision.raidus;

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
  // console.log('leftA',leftA,'topA', topA, 'bottomA', bottomA, 'rightA', rightA)

  return !(leftA > rightB || leftB > rightA || bottomA > topB || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;
},{}],3:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
  this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;

  context.save();
  context.translate(position.x, position.y);
  context.beginPath();
  context.arc(0, 0, 0.02, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
  context.fillStyle = 'red';
  context.fillRect(0,0,0.005,0.005);
  context.restore();

};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],4:[function(require,module,exports){
var PipeGraphicsComponent = function(entity) {
  this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  context.save();
  context.translate(position.x - 0.15, position.y - 0.15);
  context.beginPath();
  context.rect(0, 0, 0.3, 0.3);
  context.fill();

  // context.moveTo(position.x, position.y);
  // context.strokeStyle = 'green';
  // context.strokeRect(0,0, 0.3, 0.3);

  context.fillStyle = 'red';
  context.fillRect(0.15,0.15,0.01,0.01);
  context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],5:[function(require,module,exports){
var PlateGraphicsComponent = function(entity) {
  this.entity = entity;
};

PlateGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  context.save();
  context.translate(position.x - 1, position.y - 0.05);
  context.beginPath();
  context.rect(0, 0, 2, 0.1);
  context.fill();

  context.fillStyle = 'red';
  context.fillRect(1,0.05,0.01,0.01);
  context.restore();
};

exports.PlateGraphicsComponent = PlateGraphicsComponent;
},{}],6:[function(require,module,exports){
var WallGraphicsComponent = function(entity) {
  this.entity = entity;
};

WallGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  context.save();
  context.translate(position.x - 0.05, position.y - 0.5);
  context.beginPath();
  context.rect(0, 0, 0.1, 1);
  context.fill();

  context.fillStyle = 'red';
  context.fillRect(0.05,0.5,0.01,0.01);
  context.restore();
};

exports.WallGraphicsComponent = WallGraphicsComponent;
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");
var settings = require("../settings");
  var trigger = false;

var Bird = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = coord.x;
  physics.position.y = 0.5;
  // physics.acceleration.y = -2;

  var graphics = new graphicsComponent.BirdGraphicsComponent(this);
  var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
  collision.onCollision = this.onCollision.bind(this);
  
  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Bird.prototype.onCollision = function(entity) {
  console.log('bird position.x',this.components.physics.position.x)
  // trigger = false;
  if(trigger === false) {
  console.log("pipe.position.x: ", entity.components.physics.position.x);
  console.log("pipe.position.y: ", entity.components.physics.position.y);
  console.log('bird position.y',this.components.physics.position.y)
    console.log('trigger false!')
    trigger = true;
  }
  //reset bird position to center
  this.components.physics.position.x = 0;
  this.components.physics.position.y = 0.5;
  
};

exports.Bird = Bird;
},{"../components/collision/circle":1,"../components/graphics/bird":3,"../components/physics/physics":7,"../settings":14}],9:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var settings = require("../settings");

var Pipe = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  var size = {
    x: 0.3,
    y: 0.3 
  };
  physics.position.x = coord.x + size.x/2;
  physics.position.y = coord.y + size.y/2;
  physics.velocity.x = -0.5;
  
  var graphics = new graphicsComponent.PipeGraphicsComponent(this);
  var collision = new collisionComponent.RectCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Pipe.prototype.onCollision = function(entity) {
  // console.log('bird.position.y: ',entity.components.physics.position.y)
  // console.log("Pipe collided with entity: ", entity);
  //remove all current pipes

  

};

exports.Pipe = Pipe;

},{"../components/collision/rect":2,"../components/graphics/pipe":4,"../components/physics/physics":7,"../settings":14}],10:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/plate");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var settings = require("../settings");

var Plate = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  var size = {
    x: 2,
    y: 0.1
  }
  physics.position.x = coord.x + 1;
  physics.position.y = coord.y + 0.05;

  var graphics = new graphicsComponent.PlateGraphicsComponent(this);
  var collision = new collisionComponent.RectCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Plate.prototype.onCollision = function(entity) {
  // console.log("Plate collided with bird: ", entity);
  //reset bird position
  // entity.components.physics.position.x = 0;
  // entity.components.physics.position.y = 0.5;
};

exports.Plate = Plate;
},{"../components/collision/rect":2,"../components/graphics/plate":5,"../components/physics/physics":7,"../settings":14}],11:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/wall");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var settings = require("../settings");

var Wall = function(coord) {
  var physics = new physicsComponent.PhysicsComponent(this);
  var size = {
    x: 0.1,
    y: 1
  }
  physics.position.x = coord.x + 0.05;
  physics.position.y = coord.y + 0.5;

  var graphics = new graphicsComponent.WallGraphicsComponent(this);
  var collision = new collisionComponent.RectCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    graphics: graphics,
    physics: physics,
    collision: collision
  };
};

Wall.prototype.onCollision = function(entity) {
  // console.log("Wall collided with pipe: ", entity);
  //remove pipe
  // entity.components.graphics.entity = null;
  // entity.components.physics.entity = null;
  // entity.components.collision.entity = null;

};

exports.Wall = Wall;
},{"../components/collision/rect":2,"../components/graphics/wall":6,"../components/physics/physics":7,"../settings":14}],12:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var plate = require('./entities/plate');
var wall = require('./entities/wall');

var FlappyBird = function() {
  this.entities = [new bird.Bird({x:0}), new plate.Plate({x:-1,y:-0.05}), new plate.Plate({x:-1,y:1}), new wall.Wall({x:-1.05,y:0}), new wall.Wall({x:1,y:0}), new pipe.Pipe({x:0.7,y:0}), new pipe.Pipe({x:0.7,y:0.7})];
  this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
  this.physics = new physicsSystem.PhysicsSystem(this.entities);
  this.input = new inputSystem.InputSystem(this.entities);
};

FlappyBird.prototype.repeater = function() {
  var arr = [new pipe.Pipe({x:1,y:0}), new pipe.Pipe({x:1,y:0.7})];
  var that = this; //this is what solves the whole problem - lexical scoping
  arr.forEach(function(p){
    that.entities.push(p);
  });
};

FlappyBird.prototype.run = function() {
  this.graphics.run();
  this.physics.run();
  this.input.run();
  // window.setInterval(this.repeater.bind(this), 2000);
};

exports.FlappyBird = FlappyBird;
},{"./entities/bird":8,"./entities/pipe":9,"./entities/plate":10,"./entities/wall":11,"./systems/graphics":16,"./systems/input":17,"./systems/physics":18}],13:[function(require,module,exports){
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
  var app = new flappyBird.FlappyBird();
  app.run();
});

},{"./flappy_bird":12}],14:[function(require,module,exports){

},{}],15:[function(require,module,exports){
var CollisionSystem = function(entities) {
  this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
    var entityA = this.entities[i];
    if(!'collision' in entityA.components) {
      continue;
    }
    for(var j = i + 1; j < this.entities.length; j += 1) {
      var entityB = this.entities[j];
      if(!'collision' in entityB.components) {
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
},{}],16:[function(require,module,exports){
var GraphicsSystem = function(entities) {
  this.entities = entities;
  this.canvas = document.getElementById('main-canvas');
  this.context = this.canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function() {
  window.requestAnimationFrame(this.tick.bind(this));
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
    if(!'graphics' in entity.components) {
      continue;
    }
    entity.components.graphics.draw(this.context);
  }

  this.context.restore();

  window.requestAnimationFrame(this.tick.bind(this));

};

exports.GraphicsSystem = GraphicsSystem;
},{}],17:[function(require,module,exports){
var InputSystem = function(entities) {
  this.entities = entities;
  this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
  this.canvas.addEventListener('click', this.onClick.bind(this));
  // this.canvas.addEventListener('touchstart', this.onClickMobile.bind(this));
};

InputSystem.prototype.onClick = function() {
  var bird = this.entities[0];
  bird.components.physics.velocity.y = 0.7;
};

InputSystem.prototype.onClickMobile = function(e) {
  e.preventDefault();
  console.log('touched');
  
  var bird = this.entities[0];
  bird.components.physics.velocity.y = 0.3;
};

exports.InputSystem = InputSystem;

},{}],18:[function(require,module,exports){
var collisionSystem = require('./collision');

var PhysicsSystem = function(entities) {
  this.entities = entities;
  this.collisionSystem = new collisionSystem.CollisionSystem(entities);
};

PhysicsSystem.prototype.run = function() {
  window.setInterval(this.tick.bind(this), 1000/60);
};

PhysicsSystem.prototype.tick = function() {
  for(var i = 0; i < this.entities.length; i += 1) {
    var entity = this.entities[i];
    if(!'physics' in entity.components) {
      continue;
    }

    entity.components.physics.update(1/60);
  }
  
  this.collisionSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;

},{"./collision":15}]},{},[13]);
