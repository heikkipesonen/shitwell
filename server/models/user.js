const db = require('../db')
const Sequelize = require('sequelize')
const crypto = require('crypto')

const user = db.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    set (value) {
      const pass = crypto.createHash('sha256').update(value, 'utf8').digest('hex')
      this.setDataValue('password', pass)
    }
  },
  street: {
    type: Sequelize.STRING
  },
  zipcode: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    },
    set (value) {
      this.setDataValue('email', value.toLowerCase())
    }
  },
}, {
  timestamps: true,
  paranoid: true
})

user.prototype.authenticate = function (password) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256').update(password, 'utf8').digest('hex')
    return hash === this.password ? resolve(this) : reject(false)
  })
}

module.exports = user
