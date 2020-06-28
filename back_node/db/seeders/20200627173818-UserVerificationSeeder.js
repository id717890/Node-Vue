'use strict'

module.exports = {
  // eslint-disable-next-line
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserVerifications', [
      {
        UserId: 1,
        token: 'qweqweqwe',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  // eslint-disable-next-line
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserVerifications', null, {})
  }
}
