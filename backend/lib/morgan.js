'use strict'

const morgan        = require('morgan')
const accessStream  = require('./logger').accessStream

module.exports = function(format) {
  let options = {
    stream: accessStream
  }

  return morgan(format, options)
}
