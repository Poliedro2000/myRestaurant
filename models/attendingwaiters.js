'use strict';
module.exports = (sequelize, DataTypes) => {
  const AttendingWaiters = sequelize.define('AttendingWaiters', {
    statusAttending: DataTypes.BOOLEAN,
    waiterId: DataTypes.INTEGER,
    tableId: DataTypes.INTEGER,
    actualTableAttending: DataTypes.STRING,
    orders: DataTypes.ARRAY(DataTypes.STRING),
    prices: DataTypes.ARRAY(DataTypes.INTEGER),
    rates: DataTypes.INTEGER,
    dateAttending: DataTypes.DATE
  }, {});
  AttendingWaiters.associate = function(models) {
    // associations can be defined here
  };
  return AttendingWaiters;
};