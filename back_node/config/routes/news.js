const router = require('express').Router()
const { check } = require('express-validator')
const auth = require('../../api/middleware/auth.policy')
const { index, all, create } = require('../../api/controllers/news.controller')

router.get('/', auth, index)
router.get('/all', all)
router.post(
  '/',
  [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('text').not().isEmpty().withMessage('Text of news is required')
  ],
  create
)

module.exports = router
