module.exports = (req, res, next) => {
  console.log('test 2 middleware')
  return next()
}
