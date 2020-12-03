'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResetPassword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ResetPassword.belongsTo(models.User)
    }
  };
  ResetPassword.init({
    token: DataTypes.STRING,
    expire: DataTypes.STRING,
    used: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ResetPassword',
  });
  return ResetPassword;
};