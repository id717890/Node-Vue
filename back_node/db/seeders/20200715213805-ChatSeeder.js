'use strict'

module.exports = {
  // eslint-disable-next-line
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Chats', data)
    const chatUsers = [
      {
        ChatId: 1,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ChatId: 1,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('ChatUsers', chatUsers)
    const chatMessages = [
      {
        ChatId: 1,
        sender: '1',
        receiver: '2',
        text: 'qweqweqwe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ChatId: 1,
        sender: '1',
        receiver: '2',
        text: '1234 123',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('ChatMessages', chatMessages)
  },

  // eslint-disable-next-line
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ChatMessages', null, {})
    await queryInterface.bulkDelete('ChatUsers', null, {})
    return queryInterface.bulkDelete('Chats', null, {})
  }
}
