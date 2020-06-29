const Sequelize = require('sequelize')
const sequelize = require('../../config/database')
const User = require('./User')
const hooks = {}

const tableName = 'UserResets'

const UserReset = sequelize.define(
  'UserResets', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    UserId: {
      type: Sequelize.INTEGER
    },
    token: {
      allowNull: false,
      type: Sequelize.STRING
    }
  }, {
    hooks,
    tableName
  }
)

UserReset.belongsTo(User)


module.exports = UserReset