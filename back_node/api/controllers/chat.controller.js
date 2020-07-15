const Chat = require('../../db/models/chat')

const index = async (req, res) => {
  try {
    if (!req.token || !req.token.id) return res.status(400).json({
      msg: 'Bad request. Token not found'
    })
    const items = await Chat.findAll()
    return res.status(200).json(items)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

module.exports = { index }
