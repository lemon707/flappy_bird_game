var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');

var bird = require('./entities/bird');

var FlappyBird = function() {
  this.entities = [new bird.Bird()];
  this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
  this.physics = new physicsSystem.PhysicsSystem(this.entities);
  this.input = new inputSystem.InputSystem(this.entities);
};

FlappyBird.prototype.run = function() {
  this.graphics.run();
  this.physics.run();
  this.input.run();
};

exports.FlappyBird = FlappyBird;