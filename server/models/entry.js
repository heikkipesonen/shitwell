const db = require('../db')
const Sequelize = require('sequelize')
const device = require('./device')

const entry = db.define('entry', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  value: {
    type: Sequelize.FLOAT,
    validate: {
      isFloat: true
    }
  },
  timeStamp: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  timestamps: true,
  updatedAt: false
})

entry.belongsTo(device)

module.exports = entry
