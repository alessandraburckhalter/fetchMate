'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Skills', [
      {
        // Technical Skills Seeders
        name: 'JavaScript',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Python',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'CSS',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'HTML',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'jQuery',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'PostgreSQL',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Sequelize',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Java',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'C#',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'C',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'C++',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Go',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'R',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Swift',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'PHP',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      // Soft Skills Seeders
      {
        name: 'Communication',
        category: 'soft',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Empathy',
        category: 'soft',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Patience',
        category: 'soft',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Communication',
        category: 'soft',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Communication',
        category: 'soft',
        createdAt: new Date,
        updatedAt: new Date,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Skills', null, {})
  }
};
