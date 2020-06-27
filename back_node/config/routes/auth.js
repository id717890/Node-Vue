const router = require('express').Router()
const { login, register } = require('../../api/controllers/user.controller')
const { check } = require('express-validator')
router.post('/login', login)
// router.post('/register',
//   body('email').custom(value => {
//     return User.findUserByEmail(value).then(user => {
//       if (user) {
//         return Promise.reject('E-mail already in use');
//       }
//     });
//   })
//   , register)

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
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long')
  ],
  register
)

module.exports = router
