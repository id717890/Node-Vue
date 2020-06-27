const Config = require('../models/Config')

const index = async (req, res) => {
  try {
    const configs = await Config.findAll()
    return res.status(200).json(configs)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'Internal server error' 
    })
  }
}

module.exports = { index }