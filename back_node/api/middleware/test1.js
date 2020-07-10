module.exports = (req, res, next) => {
  console.log('test 1 middleware')
  return next()
}
