var PipeGraphicsComponent = function(entity) {
  this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  var size = this.entity.components.physics.size;
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