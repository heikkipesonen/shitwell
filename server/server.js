const express = require('express')
const server = express()
const bodyParser = require('body-parser');

server.use(bodyParser.json())

module.exports = server
