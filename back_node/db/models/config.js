const Sequelize = require('sequelize')

const sequelize = require('../../config/database')

const hooks = {}

const tableName = 'Configs'

const Config = sequelize.define(
  'Configs',
  {
    key: {
      type: Sequelize.STRING,
      allowNull: false
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { hooks, tableName }
)

module.exports = Config