const Sequelize = require('sequelize')
const sequelize = require('../../config/database')
const hooks = {}
const ChatMessage = require('./ChatMessages')
const ChatUser = require('./chatusers')

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

ChatUser.belongsTo(Chat)
ChatMessage.belongsTo(Chat)
Chat.hasMany(ChatMessage, {as: 'messages'})

module.exports = Chat