'use strict'

const mongoose      = require('mongoose')
const mongooseTypes = require('mongoose-types')

require('bluebird').promisifyAll(mongoose)
mongooseTypes.loadTypes(mongoose)

function bootstrap(mongoOptions) {
  let mongoUri  = mongoOptions.uri
  let mongoOpts = mongoOptions.options || {}

  mongoose.connection.once('open', function() {
    if (!mongoOpts.quiet) {
      console.log('Mongoose connected to ' + mongoUri)
    }
  })
  mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err)
  })

  mongoose.connect(mongoUri, mongoOpts)
}

function shutdown(done) {
  mongoose.connection.removeAllListeners()
  mongoose.connection.close(done)
}

exports.bootstrap = bootstrap
exports.shutdown  = shutdown
