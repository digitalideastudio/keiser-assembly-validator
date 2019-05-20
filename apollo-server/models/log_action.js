'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('LogAction', {
    userName: DataTypes.STRING,
    action: DataTypes.STRING,
    payload: DataTypes.STRING,
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
    tableName: 'log_actions',
  });
};
