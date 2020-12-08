'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Skills', 'name', {
      type: Sequelize.STRING,
      unique: true,
  })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Skills', 'name', {
      type: Sequelize.STRING,
    })
  }
};
