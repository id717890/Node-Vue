const Sequelize = require('sequelize')
const sequelize = require('../../config/database')
// const Chat = require('./Chat')
const hooks = {}

const tableName = 'ChatMessages'

const ChatMessage = sequelize.define(
  'ChatMessages',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    ChatId: {
      type: Sequelize.INTEGER
    },
    sender: {
      type: Sequelize.STRING,
      allowNull: false
    },
    receiver: {
      type: Sequelize.STRING,
      allowNull: true
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },
  {
    hooks,
    tableName
  }
)



module.exports = ChatMessage
