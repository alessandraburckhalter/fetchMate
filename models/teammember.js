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
      //! Ask Lachlan about below
      TeamMember.belongsTo(models.User)
      TeamMember.belongsTo(models.Project)
    }
  };
  TeamMember.init({
    approved: {
      allowNull: false,
      defaultValue: 'pending',
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'TeamMember',
    //!For some reason this is making it to where when changing status it adds a new instance
    // defaultScope:{
    //   where:{
    //     approved: 'accepted'
    //   }
    // },
    // scopes:{
    //   all:{},
    //   pendingTeamMemberScope: {
    //     where: {
    //       approved: 'pending'
    //     }
    //   },
    //   allTeamMemberScope: {
    //     where: {
    //       approved: ['pending','approved']
    //     }
    //   }
    // }
  });
  return TeamMember;
};