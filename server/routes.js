const moment = require('moment')
const server = require('./server')

const {
  entries,
  users,
  devices
} = require('./modules')


const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    // intercept OPTIONS method
  if (req.method == 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
}

server.use(allowCrossDomain)

server.get('/', (req, res) => {
  res.json({
    ok: true
  })
})

server.use('/login', require('./routes/login'))
server.use('/', require('./routes/auth'))
server.use('/devices', require('./routes/devices'))
server.use('/entries', require('./routes/entries'))
server.use('/users', require('./routes/user'))

server.use('*', (req, res) => {
  res.status(400).send({
    ok: false
  })
})
