'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // define association here
      Project.belongsTo(models.User, {
        foreignKey: 'owner' //* project.getUser ==> owner
      }); 
      Project.belongsToMany(models.User, {
        //TODO ASK LACHLAN IF THEIR IS AN EASIER WAY
        through: models.TeamMember,
        as: 'Members' //* Members ==> makes sense
      })
      Project.belongsToMany(models.Skill, {
        through: 'ProjectSkills',
      })
      Project.hasMany(models.Comment)
    }
  };
  Project.init({
    owner: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    title: DataTypes.STRING,
    isCompleted: DataTypes.BOOLEAN,
    publishedAt: DataTypes.DATE,
    deadline: DataTypes.DATE,
    memberLimit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
    //! Where the magic happens
    defaultScope: {
       where: {
        isCompleted: false
      }
    },
    //* Specifically not excluding anything, therefore it will include all types
    scopes: {
      withCompleted:{}
    }
  });
  return Project;
};