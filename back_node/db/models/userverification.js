const Sequelize = require('sequelize')
const sequelize = require('../../config/database')
const User = require('./User')
const hooks = {}

const tableName = 'UserVerifications'

const UserVerification = sequelize.define(
  'UserVerifications', {
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

UserVerification.belongsTo(User)

// eslint-disable-next-line
// UserVerification.prototype.toJSON = function () {
//   const values = Object.assign({}, this.get())

//   delete values.password
//   delete values.createdAt

//   return values
// }

module.exports = UserVerification