'use strict';

const bcryptService = require('../../api/services/bcrypt.service');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'jusupovz@gmail.com',
      password: bcryptService().password({password: '123'}), // eslint-disable-line no-param-reassign,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
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

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
