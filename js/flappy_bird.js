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
  var pipeArr = [new pipe.Pipe({x:0.85,y:0.15}), new pipe.Pipe({x:0.85,y:0.85})];
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