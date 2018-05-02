const meter = require('./data')
const sender = require('./sender')
const ip = require('ip')
require('dotenv').config()

const READ_INTERVAL = 10 * 1000

const state = {
  status: false,
  timer: false,
  enabled: true
}

const updateState = (status) => {
  if (status !== state.status) {
    state.status = status
    return sender.send({
      url: 'devices/status',
      data: {
        status
      }
    }).catch((e) => {})
  }
}

const initialize = () => {
  return sender.send({
    url: 'devices',
    data: {
      address: ip.address()
    }
  }).then(() => loop(), () => setTimeout(initialize, 5000))
}

const sendEntry = () => {
  console.log('reading meter')
  return meter.readValues().then((value) => {
    updateState('ok')

    const data = {
      timeStamp: Date.now(),
      value
    }

    return sender.send({
      url: 'entries',
      data
    }).catch((e) => {})
  }, (error) => {
    updateState('meter failed')
    console.log(error)
  })
}


const loop = () => {
  console.log('loop started')
  if (state.timer) {
    clearTimeout(state.timer)
  }

  if (state.enabled) {
    console.log('device sending event')

    sendEntry().then(() => {
      state.timer = setTimeout(loop, READ_INTERVAL)
    })
  } else {
    state.timer = setTimeout(loop, READ_INTERVAL)
  }
}

initialize()
