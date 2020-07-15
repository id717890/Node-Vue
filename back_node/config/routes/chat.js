const router = require('express').Router()
const auth = require('../../api/middleware/auth.policy')
const { index } = require('../../api/controllers/chat.controller')

router.get('/', auth, index)

module.exports = router
