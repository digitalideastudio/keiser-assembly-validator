'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    model: DataTypes.STRING,
    startOver: DataTypes.BOOLEAN,
    parts: DataTypes.JSON,
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};
