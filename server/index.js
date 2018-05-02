const server = require('./server')
const db = require('./db')
require('./models')

db.sync({
  force: false
})

require('./routes')
server.listen(5000)
