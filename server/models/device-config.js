const db = require('../db')
const Sequelize = require('sequelize')
const device = require('./device')

const deviceConfig = db.define('deviceConfig', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.STRING
  },
}, {
  timestamps: true
})

deviceConfig.belongsTo(device)

module.exports = deviceConfig
