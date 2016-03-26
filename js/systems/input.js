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
}

exports.InputSystem = InputSystem;
