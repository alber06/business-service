'use strict'

const _     = require('underscore')
const pine  = require('pine')

exports.bootstrap = function(options) {
  pine.configure({
    transports: {
      console: {
        level: options.main.console.level
      },
      dailyRotateFile: {
        level: options.main.file.level,
        filename: options.main.file.filename,
        logstash: true,
        maxsize: 5242880,
        maxFiles: 30
      }
    }
  })

  let accessLogger = pine('accessLogger', {
    transports: {
      console: {
        level: options.access.console.level
      },
      dailyRotateFile: {
        level: options.access.file.level,
        filename: options.access.file.filename,
        json: false,
        maxsize: 5242880,
        maxFiles: 30
      }
    }
  })
  exports.accessStream = {
    write: function(message) {
      message = message.replace(/(?:\r\n|\r|\n)/g, '')
      accessLogger.info(message)
    }
  }
}

// must be invoked after res.status(x) to be able to read res.statusCode
exports.formatReqRes = function(req, res, extra) {
  let metadata = {
    req: {
      url: req.baseUrl || req.url
    },
    res: {
      status: res.statusCode
    }
  }

  return _.extendOwn(metadata, extra)
}

// must be invoked after res.status(x) to be able to read res.statusCode
exports.formatReqResError = function(req, res, err) {
  let metadata = {
    req: {
      url: req.baseUrl || req.url
    },
    res: {
      status: res.statusCode
    },
    error: {
      type:     err.name,
      message:  err.message
    }
  }

  return metadata
}
