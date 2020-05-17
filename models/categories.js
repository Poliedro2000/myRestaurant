'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    nameCategory: DataTypes.STRING,
    show: DataTypes.BOOLEAN
  }, {});
  Categories.associate = function(models) {
    // associations can be defined here
  };
  return Categories;
};