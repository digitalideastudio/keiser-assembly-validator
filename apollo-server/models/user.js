'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
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
    tableName: 'users',
  });
};
