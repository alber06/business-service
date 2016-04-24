'use strict'

const kraken    = require('kraken-js')
const express   = require('express')
const mongoose  = require('mongoose')
const config    = require('../../lib/config')()
require('../../lib/database')

let serverStartup = (done) => {
  let app = express()
  app.on('start', done)
  app.use(kraken({
    basedir: process.cwd(),
    onconfig: config.onconfig
  }))

  return app.listen(1338)
}

let serverShutdown = (app, done) => {
  mongoose.connection.close(() => {
    app.close(done)
  })
}

exports.startup = serverStartup
exports.shutdown = serverShutdown
