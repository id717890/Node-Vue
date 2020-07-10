const uploadImage = async (req, res) => {
  try {
    return res.status(200).json('ok')
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

const displayImage = async (req, res) => {
  try {
    console.log(req.params.filename)
    return res.status(200).json(req.params.filename)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

module.exports = { uploadImage, displayImage }
