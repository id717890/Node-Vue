const router = require('express').Router()
const { check } = require('express-validator')
const auth = require('../../api/middleware/auth.policy')
const {
  index,
  all,
  create,
  update,
  remove
} = require('../../api/controllers/news.controller')

router.get('/', auth, index)
router.get('/all', all)
router.post('/delete/:id', remove)
router.post(
  '/',
  [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('text').not().isEmpty().withMessage('Text of news is required')
  ],
  create
)
router.post(
  '/update/:id',
  [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('text').not().isEmpty().withMessage('Text of news is required')
  ],
  update
)

module.exports = router
