'use strict';
module.exports = (sequelize, DataTypes) => {
  const TrackingLogin = sequelize.define('TrackingLogin', {
    idWaiter: DataTypes.INTEGER,
    entryWork: DataTypes.DATE,
    exitWork: DataTypes.DATE,
    nickName: DataTypes.STRING
  }, {});
  TrackingLogin.associate = function(models) {
    // associations can be defined here
  };
  return TrackingLogin;
};