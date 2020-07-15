'use strict'

const bcryptService = require('../../api/services/bcrypt.service')

module.exports = {
  // eslint-disable-next-line
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        email: 'jusupovz@gmail.com',
        password: bcryptService().password({ password: '123' }),
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        email: 'ivan@gmail.com',
        password: bcryptService().password({ password: 'qwe' }),
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        email: 'max@gmail.com',
        password: bcryptService().password({ password: 'qwe' }),
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        email: 'lena@gmail.com',
        password: bcryptService().password({ password: 'qwe' }),
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        email: 'olga@gmail.com',
        password: bcryptService().password({ password: 'qwe' }),
        verified: true,
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
    return queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
