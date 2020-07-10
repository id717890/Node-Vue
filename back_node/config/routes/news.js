const router = require('express').Router()
const auth = require('../../api/middleware/auth.policy')
const { index, all } = require('../../api/controllers/news.controller')

router.get('/', auth, index)
router.get('/all', all)

module.exports = router
