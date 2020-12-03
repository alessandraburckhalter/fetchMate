//TODO ASK LACHLAN IF THEIR IS AN EASIER WAY

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TeamMember.belongsTo(models.User)
      TeamMember.belongsTo(models.Project)
    }
  };
  TeamMember.init({
    approved: {
      allowNull: false,
      defaultValue: 'pending',
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['pending', 'approved', 'declined']],
          msg: "Approved must be either pending, approved, or declined"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'TeamMember',
    defaultScope:{
      where:{
        approved: ['pending', 'approved']
      }
    },
    scopes:{
      all:{},
      pending: {
        where: {
          approved: 'pending'
        }
      },
      approved: {
        where: {
          approved: 'approved'
        }
      },
      declined: {
        where: {
          approved: 'declined'
        }
      }
    }
  });
  return TeamMember;
};