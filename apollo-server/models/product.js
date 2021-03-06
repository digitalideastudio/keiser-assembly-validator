'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    model: DataTypes.STRING,
    startOver: DataTypes.BOOLEAN,
    parts: DataTypes.JSON,
    createdAt: {
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      type: 'TIMESTAMP',
    },
    updatedAt: {
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      type: 'TIMESTAMP',
    },
  }, {
    tableName: 'products',
  });
};
