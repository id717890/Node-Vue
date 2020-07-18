module.exports = (server) => {
  const io = require('socket.io')(server)
  io.on('connection', (socket) => {
    console.log('a user connected')
    socket.emit('NEW_MESSAGE', {
      message: 'TEST SOCKET.IO SERVER'
    })
  })
}