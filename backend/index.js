'use strict'

require('coffee-script/register')

const express = require('express')
const kraken = require('kraken-js')
const config = require('./lib/config')()

let app = module.exports = express()
app.use(kraken(config))
app.on('start', () => {
  console.log('Application ready to serve requests.')
  console.log('Environment: %s', app.kraken.get('env:env'))
})
