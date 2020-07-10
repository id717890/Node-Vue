const Sequelize = require('sequelize')
const sequelize = require('../../config/database')
const hooks = {}

const tableName = 'News'

const News = sequelize.define(
  'News', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    text: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    image: {
      allowNull: true,
      type: Sequelize.STRING
    }
  }, {
    hooks,
    tableName
  }
)

module.exports = News