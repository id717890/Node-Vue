const router = require('express').Router()
const authRoutes = require('./auth')
const configRoutes = require('./config')

router.use('/auth', authRoutes)
router.use('/config', configRoutes)

module.exports = router
