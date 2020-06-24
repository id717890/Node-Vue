const express = require('express')
const app = express()
const authRoutes = require('./config/routes/auth')

app.use('/auth', authRoutes)

app.listen(3333, ()=>console.log('App STARTED'))