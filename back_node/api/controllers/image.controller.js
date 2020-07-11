const path = require('path')
const fs = require('fs')
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
const uploader = multer({
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
}).single('image')

const uploadImage = async (req, res) => {
  try {
    uploader(req, res, (err) => {
      if (err) return res.status(400).json({ msg: err.message })
      return res.status(200).json({
        'filename': req.file.filename,
        'path': req.file.path
      })
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

const displayImage = async (req, res) => {
  // console.log(fs.exists(dir))

  try {
    // res.sendFile(path.join(__dirname, './uploads/image.png'))
    // console.log(req.params.filename)
    const image = req.params.filename
    const dir = path.normalize(path.join(__dirname, '../../public/images/'))
    const file = dir + image
    console.log(file)
    fs.stat(file, (error) => {
      if (error) {
        console.log(error)
        return res.status(400).json('Bad request')
      }
      return res.sendFile(file)
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

module.exports = { uploadImage, displayImage }
