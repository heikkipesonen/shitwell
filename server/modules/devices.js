const { device } = require('../models')
const entries = require('./entries')
const moment = require('moment')

const list = () => {
  return device.findAll({
    attributes: {
      exclude: ['address', 'userId', 'createdAt', 'updatedAt']
    }
  })
}

const get = (id) => {
  return device.findOne({
    where: {
      id
    },
    attributes: {
      exclude: ['address', 'userId', 'createdAt', 'updatedAt']
    }
  }).then((result) => {
    if (!result) {
      return Promise.reject()
    }

    return result
  })
}

const create = (data) => {
  const item = device.build(data)

  return item.validate().then(() => {
    item.save()
    return {
      ok: true,
      id: item.get('id')
    }
  })
}

const setUser = ({userId, deviceId}) => {
  return device.findOne({
    where: {
      id: deviceId
    }
  }).then((entry) => {
    entry.set('userId', userId)
    entry.save()

    return {
      ok: true
    }
  })
}

const update = ({id, data}) => {
  return device.findOne({
    where: {
      id
    }
  }).then((item) => {
    if (!item) {
      return Promise.reject()
    }

    return item.update(data)
  })
}

const getLevels = async (deviceId) => {
  const device = await get(deviceId)
  return {
    min: device.get('minLevel'),
    max: device.get('maxLevel')
  }
}

const setStatus = async (deviceId, status) => {
  const device = await get(deviceId)
  device.status = status
  await device.save()
  return device
}

const getDeviceData = async ({deviceId, start = moment().subtract(1, 'month'), end = moment()}) => {
  const levels = await getLevels(deviceId)
  const list = await entries.list({ deviceId, start, end })
  return list
}

// const decorate = ({entry, levels}) => {
//   const minValue = levels.min
//   const maxValue = levels.max
//   const value = entry.value
//
//   const remaining = value - minValue
//   const dt = maxValue - minValue
//   const level = value - minValue
//
//   return {
//     ...entry,
//     min: minValue,
//     max: maxValue,
//     value,
//     level,
//     remaining,
//     fill: 1 - (remaining / dt),
//   }
// }

const getCurrentLevel = async (deviceId) => {
  const levels = await getLevels(deviceId)
  const entry = await entries.getLatestValue(deviceId)

  return {
    timeStamp: entry.createdAt,
    min: levels.min,
    max: levels.max,
    value: entry.value,
  }
}

module.exports = {
  get,
  list,
  create,
  setUser,
  update,
  getCurrentLevel,
  getDeviceData,
  setStatus,
}
