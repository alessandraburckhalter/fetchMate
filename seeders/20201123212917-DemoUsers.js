'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'Test',
        password:'$2b$10$RAAzrMRFz31QxzZ8JDfNsuXk/P3X5.2BvI3CqC6v4TWRri8TLPxoK', //password:12345
        email: 'test@test.com',
        profilePicture: null,
        createdAt: "2020-11-23T20:28:24.609Z",
        updatedAt: "2020-11-23T20:28:24.609Z"
        
      },{
        firstName: 'Test',
        lastName: 'Demo',
        password:'$2b$10$RAAzrMRFz31QxzZ8JDfNsuXk/P3X5.2BvI3CqC6v4TWRri8TLPxoK',//password:12345
        email: 'test1@test.com',
        profilePicture: null,
        createdAt: "2020-11-23T20:28:24.609Z",
        updatedAt: "2020-11-23T20:28:24.609Z"
      }

    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})
  }
};
