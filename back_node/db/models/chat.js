const Sequelize = require('sequelize')
const sequelize = require('../../config/database')
const hooks = {}

const tableName = 'Chats'

const Chat = sequelize.define(
  'Chats', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    }
  }, {
    hooks,
    tableName
  }
)

module.exports = Chat