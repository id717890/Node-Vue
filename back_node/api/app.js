const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const cors = require('cors')

require('dotenv').config()
/**
 * server configuration
 */
const config = require('../config/')
const dbService = require('./services/db.service')
// const auth = require('./policies/auth.policy');

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV

/**
 * express application
 */
const app = express()
const server = http.Server(app)
const DB = dbService(environment, config.migrate).start()
app.use(cors())
require('./socket')(server)

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', require('../config/routes'))

// const Sequelize = require('sequelize');


server.listen(config.port, () => {
  if (
    environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    console.error(
      `NODE_ENV is set to ${environment}, but only production and development are valid.`
    )
    process.exit(1)
  }
  return DB
})

// app.listen(3333, ()=>console.log('App STARTED'))
