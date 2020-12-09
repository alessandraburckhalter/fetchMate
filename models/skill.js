'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    
    static associate(models) {
      Skill.belongsToMany(models.User, {
        through: 'UserSkills', //* Skill.getUsers() --> gives an array of user that have that skill
      })
      Skill.belongsToMany(models.Project, {
        through: 'ProjectSkills', //* Skill.getProjects() --> gives an array of the projects that require that skill
      })
    }
  };
  Skill.init({
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Skill',
  });
  return Skill;
};