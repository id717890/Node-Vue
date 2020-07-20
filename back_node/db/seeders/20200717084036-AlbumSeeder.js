'use strict'

module.exports = {
  // eslint-disable-next-line
  up: async (queryInterface, Sequelize) => {
    const albums = [
      {
        id: 1,
        name: 'Album #1',
        description: 'Test album ###1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Album #2',
        description: 'Test album ###2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Albums', albums)
    const albumImages = [
      {
        albumId: 1,
        image: 'album-image-1.jpg',
        description: 'Test image 1 of album ###1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        albumId: 1,
        image: 'album-image-2.jpg',
        description: 'Test image 2 of album ###1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        albumId: 1,
        image: 'album-image-3.jpg',
        description: 'Test image 3 of album ###1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        albumId: 2,
        image: 'album-image-4.jpg',
        description: 'Test image 1 of album ###2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('AlbumImages', albumImages)
  },

  // eslint-disable-next-line
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AlbumImages', null, {})
    return queryInterface.bulkDelete('Albums', null, {})
  }
}
