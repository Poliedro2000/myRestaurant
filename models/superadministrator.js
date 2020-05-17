'use strict';
module.exports = (sequelize, DataTypes) => {
  const SuperAdministrator = sequelize.define('SuperAdministrator', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  SuperAdministrator.associate = function(models) {
    // associations can be defined here
  };
  return SuperAdministrator;
};