'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createFunction('skillcount', [
      {type: 'integer',
      name: 'pid',
      direction: 'in',
      },
      {type: 'integer',
      name: 'uid',
      direction: 'in',
      }
    ],
    'integer',
    'plpgsql',
    `RETURN (SELECT COUNT(*)
    FROM "ProjectSkills" ps
    LEFT OUTER JOIN
      (
        SELECT * FROM "UserSkills" us
        WHERE us."UserId" = uid
      ) as us
    ON us."SkillId" = ps."SkillId"
    WHERE ps."ProjectId" = pid AND
      us."SkillId" is NOT Null);`,
    []
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropFunction('skillcount', [
      {type: 'integer',
      name: 'pid',
      direction: 'in',
      },
      {type: 'integer',
      name: 'uid',
      direction: 'in',
      }
    ]);
  }
};
