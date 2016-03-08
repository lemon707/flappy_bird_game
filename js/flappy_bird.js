var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var plate = require('./entities/plate');
var wall = require('./entities/wall');

var FlappyBird = function() {
  this.entities = [new wall.Wall({x:-1,y: -1}), new wall.Wall({x:1 , y:-1}), new plate.Plate({x: -1, y: 1}), new plate.Plate({x: -1, y: -1}), new bird.Bird(), new pipe.Pipe({x:0.7,y:0}), new pipe.Pipe({x:0.7,y:0.7})];
  this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
  this.physics = new physicsSystem.PhysicsSystem(this.entities);
  this.input = new inputSystem.InputSystem(this.entities);
};

FlappyBird.prototype.repeater = function() {
  var arr = [new pipe.Pipe({x:1.3,y:0}), new pipe.Pipe({x:1.3,y:0.7})];
  var that = this; //this is what solves the whole problem - lexical scoping
  arr.forEach(function(p){
    that.entities.push(p);
  });
};

FlappyBird.prototype.collision = function(entity) {
  var counterToShow = 0;
  if(pipe.onCollision(entity)) {
    this.entities.pop();
    counterToShow += 1;
  }
};

FlappyBird.prototype.run = function() {
  this.graphics.run();
  this.physics.run();
  this.input.run();
  window.setInterval(this.repeater.bind(this), 3000);
};

exports.FlappyBird = FlappyBird;