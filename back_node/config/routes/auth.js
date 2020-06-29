const router = require('express').Router()
const {
  login,
  register,
  index,
  verifyRegister,
  resetPasswordSendToken,
  verifyReset,
  resetPassword
} = require('../../api/controllers/user.controller')

const { check } = require('express-validator')
router.get('/', index)
router.post('/verifyRegister', verifyRegister)
router.post('/verifyReset', verifyReset)
router.post('/login', login)
router.post('/resetPasswordSendToken', resetPasswordSendToken, [
  check('email')
    .isEmail()
    .withMessage('Email invalid')
    .not()
    .isEmpty()
    .withMessage('Email is empty')
])
router.post(
  '/resetPassword',
  [
    check('password')
      .not()
      .isEmpty()
      .withMessage('Password is empty')
      .isLength({
        min: 5
      })
      .withMessage('must be at least 5 chars long'),
    check('token')
      .not()
      .isEmpty()
      .withMessage('Reset token is empty')
  ],
  resetPassword
)

router.post(
  '/register',
  [
    // username must be an email
    check('email')
      .isEmail()
      .withMessage('Email invalid')
      .not()
      .isEmpty()
      .withMessage('Email is empty'),
    // password must be at least 5 chars long
    check('password')
      .isLength({
        min: 5
      })
      .withMessage('must be at least 5 chars long')
  ],
  register
)

module.exports = router
