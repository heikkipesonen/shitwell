const auth = (req, res, next) => {
  console.log('----- auth kikkare --------- ')
  next()
}

module.exports = auth
