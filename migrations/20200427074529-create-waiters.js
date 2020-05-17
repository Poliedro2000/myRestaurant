'use strict';

var setHour = function(){
  var date = new Date();
  return date.setHours(date.getHours()-5);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Waiters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      cellphone: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      waiterName: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      waiterImage: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.INTEGER
      },
      entryDate: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('Waiters');
  }
};