'use strict';
module.exports = (sequelize, DataTypes) => {
  const Waiters = sequelize.define('Waiters', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    cellphone: DataTypes.STRING,
    sex: DataTypes.STRING,
    waiterName: DataTypes.STRING,
    address: DataTypes.STRING,
    waiterImage: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    entryDate: DataTypes.DATE
  }, {});
  Waiters.associate = function(models) {
    // associations can be defined here
  };
  return Waiters;
};