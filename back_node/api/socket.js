module.exports = (server) => {
  // console.log(server)
  const io = require('socket.io')(server)
  io.on('connection', (socket) => {
    console.log('a user connected')
    socket.emit('NEW_MESSAGE', {
      message: 'test'
    })
  })
}