'use strict';

function setHour() {
  var date = new Date();
  var timeSet = date.setHours(date.getHours() - 5);
  return timeSet;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AttendingWaiters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      statusAttending: {
        type: Sequelize.BOOLEAN
      },
      waiterId: {
        type: Sequelize.INTEGER
      },
      actualTableAttending: {
        type: Sequelize.STRING
      },
      orders: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      prices: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      rates: {
        type: Sequelize.INTEGER
      },
      dateAttending: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      tableId:{
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AttendingWaiters');
  }
};