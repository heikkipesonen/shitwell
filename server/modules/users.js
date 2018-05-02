const { user } = require('../models')

const get = (id) => {
  return user.findOne({
    where: {
      id
    },
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
    }
  }).then((result) => {
    if (!result) {
      return Promise.reject()
    }

    return result
  })
}

const create = (payload) => {
  const userEntry = user.build(payload)
  return userEntry.validate().then((errors) => {
    return userEntry.save().then((entry) => {
      const response = entry.toJSON()
      delete response.password
      return response
    })
  })
}

const authenticate = ({email, password}) => {
  return user.find({
    where: {
      email
    },
  }).then((user) => {
    return user ? user.authenticate(password) : Promise.reject(false)
  })
}

module.exports = {
  get,
  create,
  authenticate
}
