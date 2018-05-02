const { entry } = require('../models')
const moment = require('moment')

const list = ({deviceId, start = moment().subtract(1, 'day'), end = moment()}) => {
  return entry.findAll({
    where: {
      deviceId,
      timeStamp: {
        $between: [
          moment(start).toISOString(),
          moment(end).toISOString()
        ]
      }
    },
    order: [
      ['timeStamp', 'DESC']
    ],
    limit: 100,
    attributes: {
      exclude: ['deviceId', 'createdAt', 'id']
    },
    raw: true
  })
}

const create = ({deviceId, value, timeStamp}) => {
  const item = entry.build({
    deviceId,
    value,
    timeStamp
  })

  return item.validate().then(() => {
    item.save()
    return {
      ok: true
    }
  })
}

const createMany = (items) => {
  return entry.bulkCreate(items)
}

const getLatestValue = (deviceId) => {
  return entry.findOne({
    where: {
      deviceId
    },
    order: [
      ['timeStamp', 'DESC']
    ],
    limit: 1
  }).then((item) => {
    if (!item) {
      return Promise.reject()
    }

    return item
  })
}

module.exports = {
  list,
  create,
  createMany,
  getLatestValue
}
