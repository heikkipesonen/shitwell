const rpio = require('rpio')
const SerialPort = require('serialport')

const options = {
  baudRate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: 'none'
}

const deviceOptions = {
  controlPin: 12,
}

const dataHandler = {
  _listeners: {},

  $on: (event, callback) => {
    if (!dataHandler._listeners[event]) {
      dataHandler._listeners[event] = []
    }

    dataHandler._listeners[event].push(callback)
    return () => {
      return dataHandler._listeners[event].indexOf(callback) > -1 ? dataHandler._listeners[event].splice(dataHandler._listeners[event].indexOf(callback), 1) : null
    }
  },

  $emit: (event, payload) => {
    const listeners = dataHandler._listeners[event]
    if (listeners) {
      listeners.forEach((listener) => listener(payload))
    }
  },

  open: () => {
    return new Promise((resolve) => {
      rpio.write(deviceOptions.controlPin, rpio.HIGH)
      setTimeout(() => resolve(), 300)
    })
  },

  close: () => {
    return new Promise((resolve) => {
      rpio.write(deviceOptions.controlPin, rpio.LOW)
      setTimeout(() => resolve(), 300)
    })
  },

  parse: (buffer) => {
    const data = []
    for (let i = 0; i < buffer.length; i++) {
      data.push(String.fromCharCode(buffer[i]))
    }

    if (data[0] === 'R' && data[data.length - 1] === '\r') {
      return parseInt(data.join('').replace('R', '').replace('\r', ''))
    } else {
      return false
    }
  },

  read: (data) => {
    dataHandler.$emit('data', dataHandler.parse(data))
  },

  readValues (count = 2) {
    return dataHandler.open().then(() => {
      return new Promise((resolve, reject) => {
        const values = []
        const timeout = setTimeout(() => reject({ error: 'timeout'}), 5000);

        const unbinder = dataHandler.$on('data', (value) => {
          values.push(value)

          if (values.length >= count) {
            clearTimeout(timeout)
            unbinder()
            dataHandler.close().then(() => {
              resolve(
                dataHandler.average(values)
              )
            })
          }
        })
      })
    })
  },

  average: (values) => {
    return values.reduce((sum, value) => {
      return sum + value
    }, 0) / values.length
  }
}

rpio.open(deviceOptions.controlPin, rpio.OUTPUT, rpio.LOW)
const port = new SerialPort('/dev/ttyAMA0', options, (error) => console.log(error))
port.on('data', dataHandler.read)


module.exports = {
  readValues: dataHandler.readValues
}
