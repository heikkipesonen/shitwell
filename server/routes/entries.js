const express = require('express')
const router = express.Router();
const { entries, users, devices } = require('../modules')
const handleError = require('./errorhandler')
const moment = require('moment')


router.post('/', (req, res) => {
  const { device } = req.headers
  const { value, timeStamp } = req.body

  console.log(req.body)
  console.log(req.headers)


  entries.create({
    deviceId: device,
    value,
    timeStamp
  }).then(() => {
    res.status(200).send({ok: true})
  }, (e) => errorhandler(e, res))
})

router.get('/:deviceId', async (req, res) => {
  const { deviceId } = req.params
  const { start, end } = req.query

  const device = await devices.get(deviceId)
  const data = await entries.list({deviceId, start, end})
  res.status(200).send({
    device,
    data
  })
})

module.exports = router
