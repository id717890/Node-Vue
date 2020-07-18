const Album = require('../../db/models/album')
const AlbumImage = require('../../db/models/albumimage')
const fs = require('fs')
const path = require('path')
const validationService = require('../services/validation.service')
const multer = require('multer')
const { v4: uuid } = require('uuid')

const storagePreload = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/images/')
  },
  filename: (req, file, callback) => {
    let ext
    switch (file.mimetype) {
      case 'image/jpeg':
        ext = '.jpg'
        break
      case 'image/png':
        ext = '.png'
        break
    }
    if (!ext) callback(new Error('File type not found'))
    const prefix = req.body.prefix
    callback(null, prefix + '-' + uuid() + ext)
  }
})

const uploaderMultiple = multer({
  storage: storagePreload,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true)
    } else {
      callback(new Error('File type is not allowed'), false)
    }
  }
}).array('images[]', 10)

const index = async (req, res) => {
  try {
    const items = await Album.findAll({
      include: [{ model: AlbumImage, as: 'images' }]
    })
    return res.status(200).json(items)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

const uploadImageMultiple = async (req, res) => {
  try {
    uploaderMultiple(req, res, (err) => {
      if (err) return res.status(400).json({ msg: err.message })
      const albumId = req.body.album
      if (!albumId) return res.status(204).json([])
      let files = []
      let imagesForDb = []
      if (req.files) {
        req.files.forEach((file) => {
          files.push({
            filename: file.filename,
            path: file.path
          })
          imagesForDb.push({
            albumId: albumId,
            image: file.filename
          })
        })
      }
      AlbumImage.bulkCreate(imagesForDb, { returning: true })
        .then((x) => {
          return res.status(200).json({
            images: x,
            album: albumId
          })
        })
        .catch(() => {
          return res.status(204).json([])
        })
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

const create = async (req, res) => {
  try {
    validationService().checkValidation(req, res)
    let newModel = await Album.create({
      name: req.body.name,
      description: !req.body.description ? null : req.body.description
    })
    return res.status(200).json(newModel)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: err.message
    })
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.id
    validationService().checkValidation(req, res)
    const findItem = await Album.findOne({
      where: { id }
    })
    if (!findItem)
      return res.status(404).json({
        msg: 'Model not found'
      })
    findItem.name = req.body.name
    findItem.description = !req.body.description ? null : req.body.description
    await findItem.save()
    return res.status(200).json(findItem)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

const remove = async (req, res) => {
  try {
    const id = req.params.id
    const findItem = await Album.findOne({
      where: { id },
      include: [
        {
          model: AlbumImage,
          as: 'images'
        }
      ]
    })
    if (!findItem) return res.status(404).json({ msg: 'Model not found' })
    if (findItem.images && findItem.images) {
      findItem.images.forEach((image) => {
        const file = path.join(__dirname, '../../public/images/' + image.image)
        fs.stat(file, (err) => {
          if (err) return
          fs.unlink(file, () => {})
        })
      })
    }
    await findItem.destroy()
    return res.status(200).json('Model have removed')
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: err.message
    })
  }
}

const removeSingleImage = async (req, res) => {
  try {
    const id = req.params.id
    const findItem = await AlbumImage.findOne({
      where: { id }
    })
    if (!findItem) return res.status(404).json({ msg: 'Model not found' })
    if (findItem.image) {
      const file = path.join(__dirname, '../../public/images/' + findItem.image)
      fs.stat(file, (err) => {
        if (err) return
        fs.unlink(file, () => {})
      })
    }
    await findItem.destroy()
    return res.status(200).json(findItem)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: err.message
    })
  }
}

module.exports = {
  index,
  create,
  update,
  remove,
  uploadImageMultiple,
  removeSingleImage
}
