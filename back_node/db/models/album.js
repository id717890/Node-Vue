const Sequelize = require('sequelize')
const sequelize = require('../../config/database')
const hooks = {}
const AlbumImage = require('./albumimage')

const tableName = 'Albums'

const Album = sequelize.define(
  'Albums',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      unique: false
    }
  },
  {
    hooks,
    tableName
  }
)

Album.hasMany(AlbumImage, { foreignKey: 'albumId', as: 'images' })

module.exports = Album
