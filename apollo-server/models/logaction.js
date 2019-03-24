'use strict';
module.exports = (sequelize, DataTypes) => {
  const LogAction = sequelize.define('LogAction', {
    userName: DataTypes.STRING,
    action: DataTypes.STRING,
    payload: DataTypes.STRING,
  }, {});
  LogAction.associate = function(models) {
    // associations can be defined here
  };
  return LogAction;
};
