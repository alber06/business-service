'use strict'

const app       = require('./index')
const http      = require('http')
const server    = http.createServer(app)
const database  = require('./lib/database')
require('./lib/socket').listen(server)


server.listen(process.env.PORT || 8080)
server.on('listening', () => {
  console.log('Server listening on http://localhost:%d', server.address().port)
})

function shutdown() {
  console.log('Server shutdown...')
  server.close()

  console.log('Mongoose shutdown...')
  database.shutdown(() => {
    process.exit(0)
  })
}

process.on('SIGTERM', shutdown) // docker stop
process.on('SIGINT' , shutdown) // ctrl-C
process.on('SIGUSR2', shutdown) // nodemon restart
