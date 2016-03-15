var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var plate = require('./entities/plate');
var wall = require('./entities/wall');

var FlappyBird = function() {
  this.entities = [new bird.Bird({x:0}), new plate.Plate({x:-1,y:-0.05}), new plate.Plate({x:-1,y:1}), new wall.Wall({x:-1,y:0}), new pipe.Pipe({x:0.85,y:0.15}), new pipe.Pipe({x:0.85,y:0.85})];
  this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
  this.physics = new physicsSystem.PhysicsSystem(this.entities);
  this.input = new inputSystem.InputSystem(this.entities);
};

FlappyBird.prototype.repeater = function() {
  var arr = [new pipe.Pipe({x:0.85,y:0.15}), new pipe.Pipe({x:0.85,y:0.85})];
  var that = this; //this is what solves the whole problem - lexical scoping
  arr.forEach(function(p){
    that.entities.push(p);
  });
};

FlappyBird.prototype.run = function() {
  this.graphics.run();
  this.physics.run();
  this.input.run();
  
  setInterval(this.repeater.bind(this), 2000);

  // clearInterval(myInterval);

};

exports.FlappyBird = FlappyBird;