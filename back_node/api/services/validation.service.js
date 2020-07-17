const { validationResult } = require('express-validator')

const validationService = () => {
  const checkValidation = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      })
    }
  }

  return {
    checkValidation
  }
}

module.exports = validationService
