"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //test migration which includes username
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('usernametable', 'username', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('usernametable', 'username', { transaction: t }),
      ]);
    });
  },
};
