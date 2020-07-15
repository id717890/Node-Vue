const router = require('express').Router()
const authRoutes = require('./auth')
const configRoutes = require('./config')
const imageRoutes = require('./image')
const newsRoutes = require('./news')
const chatRoutes = require('./chat')

router.use('/auth', authRoutes)
router.use('/config', configRoutes)
router.use('/image', imageRoutes)
router.use('/news', newsRoutes)
router.use('/chat', chatRoutes)

module.exports = router
