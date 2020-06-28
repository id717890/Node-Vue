const winston = require('winston')

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      timestamp: true,
      colorize: true,
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
})


module.exports = logger