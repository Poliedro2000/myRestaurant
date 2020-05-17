'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tables = sequelize.define('Tables', {
    tableSitting: DataTypes.STRING
  }, {});
  Tables.associate = function(models) {
    // associations can be defined here
  };
  return Tables;
};