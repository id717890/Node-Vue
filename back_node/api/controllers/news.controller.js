const News = require('../../db/models/news')
const { validationResult } = require('express-validator')
const fs = require('fs')
const path = require('path')

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

const update = async (req, res) => {
  try {
    const id = req.params.id
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      })
    }
    const findItem = await News.findOne({
      where: { id }
    })
    if (!findItem)
      return res.status(404).json({
        msg: 'Model not found'
      })
    if (findItem.image) {
      if (findItem.image !== req.body.image) {
        const file = path.join(
          __dirname,
          '../../public/images/' + findItem.image
        )
        fs.stat(file, (err) => {
          if (err) return
          fs.unlink(file, () => {})
        })
      }
    }
    findItem.title = req.body.title
    findItem.text = req.body.text
    findItem.image = !req.body.image ? null : req.body.image
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
    const findItem = await News.findOne({
      where: { id }
    })
    if (!findItem)
      return res.status(404).json({
        msg: 'Model not found'
      })
    if (findItem.image) {
      const file = path.join(__dirname, '../../public/images/' + findItem.image)
      fs.stat(file, (err) => {
        if (err) return
        fs.unlink(file, () => {})
      })
    }
    await findItem.destroy()
    return res.status(200).json('Model have removed')
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

module.exports = { index, all, create, update, remove }
