var PipeGraphicsComponent = function(entity) {
  this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  var size = this.entity.components.physics.size;
  console.log('position.x',position.x,'position.y',position.y)
  console.log('size.x',size.x,'size.y',size.y)
  context.save();
  context.translate(position.x - size.x / 2, position.y - size.y / 2);
  context.beginPath();
  context.rect(0, 0, 0.3, 0.3);
  context.fill();
  
  context.fillStyle = 'red';
  context.fillRect(0.15,0.15,0.01,0.01);
  context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;