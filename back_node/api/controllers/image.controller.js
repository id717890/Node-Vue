const path = require('path')
const fs = require('fs')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/images/')
  },
  filename: (req, file, callback) => {
    const f = req.body.test
    console.log(f)
    callback(null, file.originalname)
  }
})
const uploader = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
}).single('uploadImage')

const uploadImage = async (req, res) => {
  try {
    uploader(req, res, (err) => {
      if (err) return res.status(400).json({ msg: err.message})
      return res.status(200).json('ok')
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
