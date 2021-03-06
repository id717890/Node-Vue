const router = require('express').Router()
const { check } = require('express-validator')
const auth = require('../../api/middleware/auth.policy')
const {
  index,
  create,
  update,
  remove,
  removeSingleImage,
  uploadImageMultiple
} = require('../../api/controllers/album.controller')

router.get('/', auth, index)
router.post('/delete/:id', remove)
router.post('/image/delete/:id', removeSingleImage)
router.post(
  '/',
  [check('name').not().isEmpty().withMessage('Name is required')],
  create
)
router.post(
  '/update/:id',
  [check('name').not().isEmpty().withMessage('Name is required')],
  update
)
router.post('/uploadMultiple', uploadImageMultiple)


module.exports = router
