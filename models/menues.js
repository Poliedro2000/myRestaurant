'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menues = sequelize.define('Menues', {
    category: DataTypes.INTEGER,
    nameMenu: DataTypes.STRING,
    imageMenu: DataTypes.STRING,
    priceMenu: DataTypes.INTEGER,
    ingredients: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  Menues.associate = function(models) {
    // associations can be defined here
  };
  return Menues;
};