'use strict'

module.exports = function() {
  return {
    onconfig: (config, next) => {
      const logger = require('./logger')
      let loggerOptions = config.get('logger')
      logger.bootstrap(loggerOptions)

      const database = require('./database')
      let mongoOptions = config.get('mongo')
      database.bootstrap(mongoOptions)

      next(null, config)
    }
  }
}
