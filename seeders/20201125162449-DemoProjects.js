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
   await queryInterface.bulkInsert('Projects', [
    {
      owner: 1,
      description: 'In tempor nunc sed finibus ultrices. Curabitur nec venenatis nulla. Curabitur ipsum eros, luctus nec mauris euismod, faucibus posuere lacus. Suspendisse pharetra id orci malesuada ullamcorper. Quisque sit amet ultrices tellus, nec interdum dolor. Aliquam erat volutpat. Donec arcu nisi, aliquet id nunc non, convallis lacinia purus. Ut sed accumsan sapien, et luctus libero.',
      title:'Demo Project11111', 
      isCompleted: false,
      publishedAt: new Date,
      deadline: "2020-12-23T20:28:24.609Z",
      memberLimit: 5,
      createdAt: new Date,
      updatedAt: new Date
      
    },{
      owner: 1,
      description: 'In tempor nunc sed finibus ultrices. Curabitur nec venenatis nulla. Curabitur ipsum eros, luctus nec mauris euismod, faucibus posuere lacus. Suspendisse pharetra id orci malesuada ullamcorper. Quisque sit amet ultrices tellus, nec interdum dolor. Aliquam erat volutpat. Donec arcu nisi, aliquet id nunc non, convallis lacinia purus. Ut sed accumsan sapien, et luctus libero.',
      title:'Demo Project22222', 
      isCompleted: false,
      publishedAt: new Date,
      deadline: "2020-12-23T20:28:24.609Z",
      memberLimit: 3,
      createdAt: new Date,
      updatedAt: new Date
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
    return queryInterface.bulkDelete('Projects', null, {})
  }
};
