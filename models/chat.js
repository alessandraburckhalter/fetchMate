'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {

    static associate(models) {
      Chat.belongsTo(models.Project);
      Chat.belongsTo(models.User);
    }
  };
  Chat.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};