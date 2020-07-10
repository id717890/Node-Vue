const router = require('express').Router()
const authRoutes = require('./auth')
const configRoutes = require('./config')
const imageRoutes = require('./image')

router.use('/auth', authRoutes)
router.use('/config', configRoutes)
router.use('/image', imageRoutes)

module.exports = router
