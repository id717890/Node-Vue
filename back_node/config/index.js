// const privateRoutes = require('./routes/privateRoutes');
// const publicRoutes = require('./routes/publicRoutes');

const config = {
  migrate: false,
  // privateRoutes,
  // publicRoutes,
  port: process.env.PORT || '3333'
}

module.exports = config
