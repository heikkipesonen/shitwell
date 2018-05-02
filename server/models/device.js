const db = require('../db')
const Sequelize = require('sequelize')
const user = require('./user')

const device = db.define('device', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  minLevel: {
    type: Sequelize.FLOAT,
    validate: {
      isFloat: true
    }
  },
  maxLevel: {
    type: Sequelize.FLOAT,
    validate: {
      isFloat: true
    }
  },
  name: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true
})

device.belongsTo(user)

module.exports = device
