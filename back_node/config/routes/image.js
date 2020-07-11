const router = require('express').Router()


const {
  uploadImage,
  displayImage
} = require('../../api/controllers/image.controller')

router.post('/upload', uploadImage)
router.get('/display/:filename', displayImage)
module.exports = router
