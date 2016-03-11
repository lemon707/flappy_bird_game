var InputSystem = function(entities) {
  this.entities = entities;
  this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
  // this.canvas.addEventListener('click', this.onClick.bind(this));
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
