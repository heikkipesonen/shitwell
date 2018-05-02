const request = require('request')
require('dotenv').config()

const options = {
  uri: process.env.API_URL,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  json: true
}

const send = ({url = '', data}) => {
  const device = process.env.DEVICE_ID
  const req = {
    ...options,
    headers: {
      ...options.header,
      device
    },
    uri: `${options.uri}/${url}`,
    json: data
  }

  console.log(req)

  return new Promise((resolve, reject) => {
    request(req, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body)
      } else {
        reject(error)
      }
    })
  })
}


module.exports = {
  send
}
