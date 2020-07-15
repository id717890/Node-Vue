// const { createBlogpost } = blogService
const User = require('../../db/models/User')
const UserVerification = require('../../db/models/UserVerification')
const UserReset = require('../../db/models/UserReset')
const authService = require('../services/auth.service')
const bcryptService = require('../services/bcrypt.service')
const mailService = require('../services/mail.service')
const { validationResult } = require('express-validator')
const sequelize = require('../../config/database')
const { v4: uuid } = require('uuid')

const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      })
    }
    const { token, password } = req.body
    // const { email } = req.body
    // const find = await User.findOne({
    //   where: {
    //     email
    //   }
    // })
    // if (!find) {
    //   return res.status(404).json({
    //     msg: 'E-mail not found'
    //   })
    // }
    const findTokenReset = await UserReset.findOne({
      where: { token },
      include: [{model: User}]
    })
    if (findTokenReset && findTokenReset.User) {
      findTokenReset.User.password = password
      await findTokenReset.User.save()
      await findTokenReset.destroy()
    } else {
      return res.status(404).json({
        msg: 'Reset token not found'
      })
    }
    return res.status(200).json({
      msg: 'SUCCESS'
    })
  } catch (error) {
    return res.status(500).json({
      msg: '500 error',
      error: error
    })
  }
}

const resetPasswordSendToken = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      })
    }
    const { email } = req.body
    const find = await User.findOne({
      where: {
        email
      }
    })
    if (!find) {
      return res.status(404).json({
        msg: 'E-mail not found'
      })
    }
    const findTokenReset = await UserReset.findOne({
      where: { UserId: find.id }
    })
    if (findTokenReset) {
      mailService().sendTokenForResetPassword(email, findTokenReset.token)
    } else {
      const token = await UserReset.create({
        UserId: find.id,
        token: uuid()
      })
      mailService().sendTokenForResetPassword(email, token.token)
    }
    return res.status(200).json({
      msg: 'SUCCESS'
    })
  } catch (error) {
    return res.status(500).json({
      msg: '500 error',
      error: error
    })
  }
}

const verifyReset = async (req, res) => {
  const { token } = req.body
  try {
    const find = await UserReset.findOne({
      where: {
        token
      }
    })
    if (find) {
      return res.status(200).json({
        msg: 'success'
      })
    }
    return res.status(404).json({
      msg: 'Token not found'
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

const verifyRegister = async (req, res) => {
  const { token } = req.body
  try {
    const find = await UserVerification.findOne({
      where: {
        token: token
      },
      include: [
        {
          model: User
        }
      ]
    })
    if (find) {
      find.User.verified = true
      await find.User.save()
      await find.destroy()
      return res.status(200).json({
        msg: 'success'
      })
    }
    return res.status(404).json({
      msg: 'Token not found'
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

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
      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        return res.status(400).json({
          msg: 'Bad Request: User not found'
        })
      }

      if (user && !user.verified) {
        return res.status(400).json({
          msg: 'User not verified'
        })
      }

      if (bcryptService().comparePassword(password, user.password)) {
        const token = authService().issue({
          id: user.id,
          role: user.role
        })
        const expiration = process.env.TOKEN_EXPIRATION
        return res.status(200).json({
          token,
          expiration
        })
      }

      return res.status(401).json({
        msg: 'Unauthorized'
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        msg: 'Internal server error'
      })
    }
  }

  return res.status(400).json({
    msg: 'Bad Request: Email or password is wrong'
  })
}

const register = async (req, res) => {
  let verification, user
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    })
  }
  const { body } = req

  const find = await User.findOne({
    where: {
      email: body.email
    }
  })
  if (find) {
    return res.status(400).json({
      msg: 'E-mail already in use'
    })
  }

  if (body.password === body.password2) {
    try {
      try {
        await sequelize.transaction(async (t) => {
          user = await User.create(
            {
              email: body.email,
              password: body.password
            },
            {
              transaction: t
            }
          )

          verification = await UserVerification.create(
            {
              UserId: user.id,
              token: uuid()
            },
            {
              transaction: t
            }
          )
        })

        // If the execution reaches this line, the transaction has been committed successfully
        // `result` is whatever was returned from the transaction callback (the `user`, in this case)
      } catch (error) {
        console.log(error)
        return res.status(500).json({
          msg: '500 error',
          error: error
        })

        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
      }
      mailService().send(user.email, verification.token)

      // const token = authService().issue({
      //   id: user.id
      // })
      // const expiration = process.env.TOKEN_EXPIRATION
      // return res.status(200).json({ token, expiration })
      return res.status(200).json('SUCCESS')
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        msg: err
      })
    }
  }

  return res.status(400).json({
    msg: 'Bad Request: Passwords don\'t match'
  })
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

module.exports = {
  index,
  login,
  register,
  verifyRegister,
  resetPasswordSendToken,
  verifyReset,
  resetPassword
}
