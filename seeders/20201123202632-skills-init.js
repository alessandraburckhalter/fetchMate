'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Skills', [
      {
        //! Technical Skills Seeders
        //* Programming Languages Section
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
      //* Other frontend Section
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
      //* DB section
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
        name: 'Oracle 12c',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'MySQL',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Microsoft SQL Server',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'MongoDB',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'MariaDB',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'DB2',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'SAP HANA',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },

      //* JS Libraries
      {
        name: 'Angular',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'React',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Vue',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Redux',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Ember',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Meteor',
        category: 'technical',
        createdAt: new Date,
        updatedAt: new Date,
      },
      //! Soft Skills Seeders
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
        name: 'Adaptability',
        category: 'soft',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Problem-Solving',
        category: 'soft',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Creativity',
        category: 'soft',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Humility',
        category: 'soft',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Confidence',
        category: 'soft',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Management',
        category: 'soft',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Teamwork',
        category: 'soft',
        createdAt: new Date,
        updatedAt: new Date,
      },
      //! Language Skills Seeders
      {
        name: 'Korean',
        category: 'language',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Chinese',
        category: 'language',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Spanish',
        category: 'language',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'English',
        category: 'language',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Arabic',
        category: 'language',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Hindi',
        category: 'language',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Bengali',
        category: 'language',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Portuguese',
        category: 'language',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Russian',
        category: 'language',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Japanese',
        category: 'language',
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'German',
        category: 'language',
        createdAt: new Date,
        updatedAt: new Date,
      },

    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Skills', null, {})
  }
};
