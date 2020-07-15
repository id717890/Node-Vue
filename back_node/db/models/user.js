const Sequelize = require('sequelize')
const bcryptService = require('../../api/services/bcrypt.service')

const sequelize = require('../../config/database')

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user) // eslint-disable-line no-param-reassign
  },
  beforeUpdate(user) {
    user.password = bcryptService().password(user)
  }
}

const tableName = 'Users'

const User = sequelize.define(
  'User',
  {
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: 'user'
    }
  },
  { hooks, tableName }
)

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get())

  delete values.password
  delete values.createdAt

  return values
}

module.exports = User
