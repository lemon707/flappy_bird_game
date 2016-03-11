var PipeGraphicsComponent = function(entity) {
  this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  context.save();
  context.translate(position.x, position.y);
  context.beginPath();
  context.rect(0, 0, 0.3, 0.3);
  context.fill();
  context.closePath();
  context.fillStyle = 'red';
  context.fillRect(0,0,0.01,0.01);
  context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;