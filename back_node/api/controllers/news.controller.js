const News = require('../../db/models/news')

// const path = require('path')
// const fs = require('fs')
// const multer = require('multer')
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, './public/images/')
//   },
//   filename: (req, file, callback) => {
//     const f = req.body.test
//     console.log(f)
//     callback(null, file.originalname)
//   }
// })
// const uploader = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   }
// }).single('uploadImage')

const index = async (req, res) => {
  try {
    const items = await News.findAll()
    return res.status(200).json(items)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

const all = async (req, res) => {
  try {
    const items = await News.findAll()
    return res.status(200).json(items)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

module.exports = { index, all }
