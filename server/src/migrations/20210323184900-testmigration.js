'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //test migration which includes username
    return queryInterface.createTable("testmigration", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: Sequelize.STRING, unique: true },
      password: Sequelize.STRING,
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
      username: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("testmigration");
  },
};
