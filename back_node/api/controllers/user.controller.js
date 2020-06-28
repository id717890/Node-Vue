// const { createBlogpost } = blogService
const User = require('../models/User')
const UserVerification = require('../models/UserVerification')
const authService = require('../services/auth.service')
const bcryptService = require('../services/bcrypt.service')
const mailService = require('../services/mail.service')
const { validationResult } = require('express-validator')

const index = async (req, res) => {
  try {
    const users = await User.findAll()
    return res.status(200).json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'Internal server error' 
    })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body 

  if (email && password) {
    try {
      const user = await User
        .findOne({
          where: {
            email
          }
        })

      if (!user) {
        return res.status(400).json({ msg: 'Bad Request: User not found' })
      }

      if (bcryptService().comparePassword(password, user.password)) {
        const token = authService().issue({ id: user.id })
        const expiration = process.env.TOKEN_EXPIRATION
        return res.status(200).json({ token, expiration })
      }

      return res.status(401).json({ msg: 'Unauthorized' })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ msg: 'Internal server error' })
    }
  }

  return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' })
}

const register = async (req, res) => {
  mailService().send()
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const { body } = req

  const find = await User.findOne({
    where: {
      email: body.email
    }
  })
  if (find) {
    return res.status(400).json({ msg: 'E-mail already in use' })
  }

  if (body.password === body.password2) {
    try {
      const user = await User.create({
        email: body.email,
        password: body.password
      })
      const verification = await UserVerification.create({
        UserId: user.id,
        token: 'qqqq'
      })

      console.log(verification)
      const token = authService().issue({ id: user.id })
      const expiration = process.env.TOKEN_EXPIRATION
      return res.status(200).json({ token, expiration })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ msg: err })
    }
  }

  return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' })
}

// return {
//   getAllUsers
// }

// const postBlogpost = async (req, res, next) => {
//   const {
//     user,
//     content
//   } = req.body
//   try {
//     await createBlogpost(user, content)
//     // other service call (or same service, different function can go here)
//     // i.e. - await generateBlogpostPreview()
//     res.sendStatus(201)
//     next()
//   } catch (e) {
//     console.log(e.message)
//     res.sendStatus(500) && next(error)
//   }
// }

module.exports = { index, login, register }
