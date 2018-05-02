const handleError = (error, res) => {
  console.log(error)
  res.status(500).send({
    ok: false
  })
}

module.exports = handleError
