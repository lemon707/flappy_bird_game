var WallGraphicsComponent = function(entity) {
  this.entity = entity;
};

WallGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  context.save();
  context.translate(position.x - 0.05, position.y - 0.5);
  context.beginPath();
  context.rect(0, 0, 0.1, 1);
  context.fill();

  context.fillStyle = 'red';
  context.fillRect(0.05,0.5,0.01,0.01);
  context.restore();
};

exports.WallGraphicsComponent = WallGraphicsComponent;