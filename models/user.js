'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Project, {
        foreignKey: 'owner' //* User.getProjects() --> gets the projects that the user in question is owner of
      })
      User.belongsToMany(models.Project, {
        through: 'TeamMembers',
        as: 'MemberProjects' //* User.getMemberProjects() --> gets the projects that the user is a team member of
      })
      User.belongsToMany(models.Skill, {
        through: 'UserSkills', //* User.getSkills() --> gives an array of the skills that the user has
      })
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profilePicture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};