var RemovalComponent = function(entity) {
  this.entity = entity;
  this.toRemove = false;
  this.toRemoveAllOfType = false;
};

exports.RemovalComponent = RemovalComponent;