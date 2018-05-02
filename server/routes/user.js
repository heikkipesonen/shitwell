const express = require('express')
const router = express.Router();
const { entries, users, devices } = require('../modules')
const handleError = require('./errorhandler')

router.post('/', async (req, res) => {
  const data = req.body
  try {
    const user = await users.create(data)
    res.status(200).send(user)
  } catch (e) {
    errorhandler(e, res)
  }
})

router.post('/:userId/assign/:deviceId', async (req, res) => {
  const { deviceId, userId } = req.params
  try {
    const device = await devices.get(deviceId)
    device.user = userId
    const result = await device.save()
    res.status(200).send(result)
  } catch (e) {
    errorhandler(e, res)
  }
})

router.get('/:userId/devices', (req, res) => {
  const { userId } = req.params
  devices.list(userId).then((response) => {
    res.status(200).send(response)
  }, (e) => handleError(e, res))
})
//
// router.get('/:userId/devices/:deviceId/level', (req, res) => {
//   const { userId, deviceId } = req.params
//   devices.getCurrentLevel(deviceId).then((response) => {
//     res.status(200).send(response)
//   }, (e) => handleError(e, res))
// })

module.exports = router
