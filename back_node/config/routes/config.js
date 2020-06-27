const router = require('express').Router()
const { index  } = require('../../api/controllers/config.controller')
router.get('/', index)
module.exports = router
