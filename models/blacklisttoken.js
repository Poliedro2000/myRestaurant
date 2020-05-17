'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlackListToken = sequelize.define('BlackListToken', {
    unableToken: DataTypes.TEXT
  }, {});
  BlackListToken.associate = function(models) {
    // associations can be defined here
  };
  return BlackListToken;
};