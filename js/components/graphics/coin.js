var CoinGraphicsComponent = function(entity) {
  this.entity = entity;
};

CoinGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  var image_coin = document.getElementsByClassName("img_coin")[0];

  context.save();
  context.translate(position.x, position.y);
  context.beginPath();
  // context.fillStyle = '#ffd700';
  context.arc(0, 0, 0.01, 0, 2 * Math.PI);
  context.fillStyle = 'transparent';
  context.fill();
  context.drawImage(image_coin,-0.015,-0.015,0.035,0.035);
  context.closePath();
  // drawing out the center of the circle
  // context.fillStyle = 'black';
  // context.fillRect(0,0,0.005,0.005);
  context.restore();

};

exports.CoinGraphicsComponent = CoinGraphicsComponent;