const Chat = require('../../db/models/chat')
const User = require('../../db/models/user')
const ChatUser = require('../../db/models/chatusers')
const ChatMessage = require('../../db/models/chatmessages')

const index = async (req, res) => {
  try {
    if (!req.token || !req.token.id) return res.status(400).json({
      msg: 'Bad request. Token not found'
    })
    const userId = req.token.id
    const findChatsByUser = await ChatUser.findAll({
      where: {
        UserId: userId
      },
      include: [
        {
          model: User,
          attributes: ['id','email']
        },
        {
          model: Chat,
          include: [
            {
              model: ChatMessage,
              as: 'messages'
            }
          ]
        }
      ]
    })
    const items = await Chat.findAll()

    console.log(findChatsByUser)
    console.log(items)

    return res.status(200).json(findChatsByUser)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

module.exports = { index }
