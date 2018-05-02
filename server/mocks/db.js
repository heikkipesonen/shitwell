const db = require('../db')

const moment = require('moment')
const Users = require('../modules/users')
const Devices = require('../modules/devices')
const Entries = require('../modules/entries')

const createUser = () => {
  return Users.create({
    email: 'test@test.test',
    name: 'kissakala',
    password: 'kissakala',
  })
}

const createDevice = (userId) => {
  console.log('create device')
  return Devices.create({
    userId,
    name: 'kissakaladevice',
    minLevel: 20,
    maxLevel: 200,
  })
}

const step = 10 * 60 * 1000

const generateEntries = ({deviceId, start, end, min = 0, max = 220}) => {
  const result = []
  const range = max - min

  while (start.isBefore(end)) {
    result.push({
      deviceId,
      value: Math.round((Math.random() * range - min) * 100) / 100,
      timeStamp: start.toISOString()
    })

    start.add(step, 'milliseconds')
  }

  return Entries.createMany(result)
}


const generateMockDb = async () => {
  return db.sync({
    force: true
  }).then(() => {
    return createUser().then((user) => {
      return createDevice(user.id).then((device) => {
        return generateEntries({
          deviceId: device.id,
          start: moment().subtract(1, 'year'),
          end: moment(),
          min: device.minLevel,
          max: device.maxLevel
        })
      })
    })
  })

}

generateMockDb()
