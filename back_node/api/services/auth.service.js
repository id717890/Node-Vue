const jwt = require('jsonwebtoken')

const secret =
  process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret'

const expiration = process.env.TOKEN_EXPIRATION

const authService = () => {
  // console.log(process.env.TOKEN_EXPIRATION)
  const issue = (payload) =>jwt.sign(payload, secret, { expiresIn: parseInt(expiration) })
  const verify = (token, cb) => jwt.verify(token, secret, {}, cb)

  return {
    issue,
    verify
  }
}

module.exports = authService
