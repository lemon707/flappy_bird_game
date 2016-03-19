var WallGraphicsComponent = function(entity) {
  this.entity = entity;
};

WallGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  var size = this.entity.components.physics.size;
  context.save();
  context.translate(position.x - size.x / 2, position.y - size.y / 2);
  context.beginPath();
  context.rect(0, 0, size.x, size.y);
  context.fillStyle = 'transparent';
  context.fill();
  context.restore();
};

exports.WallGraphicsComponent = WallGraphicsComponent;