const Sequelize = require('sequelize')
const sequelize = require('../../config/database')
const User = require('./User')
// const Chat = require('./Chat')
const hooks = {}

const tableName = 'ChatUsers'

const ChatUser = sequelize.define(
  'ChatUsers',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    UserId: {
      type: Sequelize.INTEGER
    },
    ChatId: {
      type: Sequelize.INTEGER
    }
  },
  {
    hooks,
    tableName
  }
)

ChatUser.belongsTo(User)
// ChatUser.belongsTo(Chat, { alias: 'chat1' })

module.exports = ChatUser
