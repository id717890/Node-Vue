const News = require('../../db/models/news')
const { validationResult } = require('express-validator')

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

const create = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      })
    }
    let news = await News.create({
      title: req.body.title,
      text: req.body.text,
      image: !req.body.image ? null : req.body.image
    })
    return res.status(200).json(news)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

module.exports = { index, all, create }
