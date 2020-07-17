const Sequelize = require('sequelize')
const sequelize = require('../../config/database')
const hooks = {}
// const Album = require('./album')

const tableName = 'AlbumImages'

const AlbumImage = sequelize.define(
  'AlbumImages', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    albumId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Albums', // name of Target model
        key: 'id' // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  }, {
    hooks,
    tableName
  }
)

module.exports = AlbumImage