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