'use strict';
module.exports = (sequelize, DataTypes) => {
  const TypesProfile = sequelize.define('TypesProfile', {
    numberType: DataTypes.INTEGER,
    nameType: DataTypes.STRING
  }, {});
  TypesProfile.associate = function(models) {
    // associations can be defined here
  };
  return TypesProfile;
};