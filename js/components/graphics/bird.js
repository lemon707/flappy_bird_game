var BirdGraphicsComponent = function(entity) {
  this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
  context.beginPath();
  context.fillStyle = "yellow";
  context.arc(70,70,20,0,2*Math.PI);
  context.fill();

  context.beginPath();
  context.rect(100, 100, 100, 100);
  context.fillStyle = "red"
  context.fill();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;