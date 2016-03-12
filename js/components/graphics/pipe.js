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