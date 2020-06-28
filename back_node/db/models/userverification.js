'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserVerification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line
    static associate(models) {
      // define association here
    }
  };
  UserVerification.init({
    userId: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserVerification'
  })
  return UserVerification
}