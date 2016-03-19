var CoinGraphicsComponent = function(entity) {
  this.entity = entity;
};

CoinGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;

  context.save();
  context.translate(position.x, position.y);
  context.beginPath();
  context.fillStyle = '#ffd700';
  context.arc(0, 0, 0.01, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
  context.fillStyle = 'black';
  context.fillRect(0,0,0.005,0.005);
  context.restore();

};

exports.CoinGraphicsComponent = CoinGraphicsComponent;