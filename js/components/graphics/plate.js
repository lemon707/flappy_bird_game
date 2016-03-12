var PlateGraphicsComponent = function(entity) {
  this.entity = entity;
};

PlateGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  context.save();
  context.translate(position.x - 0.05, position.y - 1);
  context.beginPath();
  context.rect(0, 0, 2, 0.1);
  context.fill();

  context.fillStyle = 'red';
  context.fillRect(0.05,1,0.01,0.01);
  context.restore();
};

exports.PlateGraphicsComponent = PlateGraphicsComponent;