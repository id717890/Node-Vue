'use strict'

module.exports = {
  // eslint-disable-next-line
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('News', [
      {
        title: 'News #1',
        text: 'Test news 1',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'News #2',
        text: 'Test news 2',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  // eslint-disable-next-line
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('News', null, {})
  }
}
