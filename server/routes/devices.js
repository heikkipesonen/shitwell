const express = require('express')
const router = express.Router();
const { devices, deviceConfig} = require('../modules')
const handleError = require('./errorhandler')

router.get('/', (req, res) => {
  devices.list().then((list) => {
    res.send(list)
  }, (e) => errorhandler(e, res))
})

router.get('/:deviceId', async (req, res) => {
  const { deviceId } = req.params
  try {
    const device = await devices.get(deviceId)
    const status = await devices.getCurrentLevel(deviceId)
    res.send({
      device,
      status
    })
  } catch (e) {
    errorhandler(e, res)
  }
})

router.post('/', (req, res) => {
  const { device } = req.headers
  const data = req.body
  console.log('set device location')
  devices.get(device).then((model) => {
    console.log('set', data.address)
    model.address = data.address
    return model.save()
  }, () => {
    return devices.create({
      id: device,
      address: data.address,
    })
  }).then(() => {
    res.status(200).send({ ok: true })
  })
})

router.post('/:deviceId/update', (req, res) => {
  const { deviceId } = req.params
  const { name, maxLevel, minLevel } = req.body

  devices.get(deviceId).then((model) => {
    return model.update({
      name,
      maxLevel,
      minLevel
    })
  }).then((model) => {
    res.send(model.get({raw: true}))
  }, (e) => errorhandler(e, res))
})

router.post('/status', (req, res) => {
  const { device } = req.headers
  const { status } = req.body

  devices.setStatus(device, status)
    .then(() => res.send({ok: true}), (e) => errorhandler(e, res))
})
//
// router.post('/', (req, res) => {
//   const { userId, name } = req.body
//   users.get(userId).then((user) => {
//     return devices.create({
//       userId,
//       name
//     }).then((response) => {
//       res.status(200).send(response)
//     })
//   }, (e) => handleError(e, res))
// })
//
// router.put('/:id', (req, res) => {
//   const { id } = req.params
//   const data = req.body
//
//   devices.update({
//     id,
//     data
//   }).then((response) => {
//     res.status(200).send(response)
//   }, (e) => handleError(e, res))
// })

module.exports = router
