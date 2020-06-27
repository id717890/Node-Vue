'use strict'

module.exports = {
  // eslint-disable-next-line
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Configs', [
      {
        key: 'navbar',
        value: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'footer',
        value: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'theme',
        value: 'dark',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'color',
        value: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },
  // eslint-disable-next-line
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Configs', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
