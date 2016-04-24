'use strict'

const mongoose      = require('mongoose')
const _             = require('underscore')
const numeral       = require('numeral')
const logger        = require('pine')()
const formatReqRes  = require('./logger').formatReqRes
const formatError   = require('./logger').formatReqResError

module.exports = function() {
  return function(req, res) {
    healthInfo()
      .then((info) => {
        res.status(200).json(info)
        logger.info('Health check OK', formatReqRes(req, res))
      })
      .catch((err) => {
        res.status(503).json({ error: err })
        logger.error('Health check failed', formatError(req, res, err))
      })
  }
}

function healthInfo() {
  let mongooseHealthy = mongoose.connection.readyState === 1

  let info = {
    pid: process.pid,
    memory: memoryUsage(),
    uptime: uptime(),
    mongoose: mongooseHealthy
  }

  if (mongooseHealthy) {
    info.status = 'OK'
    return Promise.resolve(info)
  } else {
    info.status = 'ERROR'
    return Promise.reject(new HealthError(info))
  }
}

function memoryUsage() {
  let mem = {}
  _.forEach(process.memoryUsage(), (value, field) => {
    mem[field] = numeral(value).format('0.00b')
  })
  return mem
}

function uptime() {
  return numeral(process.uptime()).format('00:00:00')
}

function HealthError(healthInfo) {
  this.name = 'HealthError'
  this.message = 'Service Health Error'
  this.healthInfo = healthInfo
}
HealthError.prototype = Object.create(Error.prototype)
HealthError.prototype.constructor = HealthError
