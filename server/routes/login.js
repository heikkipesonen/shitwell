const express = require('express')
const router = express.Router();
const { users, devices } = require('../modules')
const handleError = require('./errorhandler')

router.post('/', (req, res) => {
  const { email, password } = req.body
  console.log('got login', email, password)
  users.authenticate({
    email,
    password
  }).then(async (user) => {
    const userDevices = await devices.list(user.id)
    const userData = await users.get(user.id)

    res.status(200).send({
      ...userData.dataValues,
      devices: userDevices
    })
  }, (e) => handleError(e, res))
})

module.exports = router
