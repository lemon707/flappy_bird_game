var RemovalComponent = function(entity) {
  this.entity = entity;
  this.toBeRemoved = false;
  this.toRemoveAllOfType = false;
};

exports.RemovalComponent = RemovalComponent;