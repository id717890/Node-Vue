const router = require('express').Router()
const  {index, register} = require('../../api/controllers/user.controller')

router.get('/login', index)
router.post('/register', register)

module.exports = router