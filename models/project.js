'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.User);
      Project.belongsToMany(models.User, {
        through: 'TeamMembers',
        as: 'Members' //* Project.members ==> makes sense
      })
      Project.belongsToMany(models.Skill, {
        through: 'ProjectSkills',
      })
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
  });
  return Project;
};