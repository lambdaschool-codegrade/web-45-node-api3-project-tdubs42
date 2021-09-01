const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const usersRouter = require('./users/users-router')
const {logger} = require('./middleware/middleware')

const server = express()
server.use(helmet())
server.use(cors())

server.use('/api/users', logger, usersRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Remember your why</h2>`)
})

module.exports = server
