'use strict'

const logger = require('pine')()

module.exports = function() {
  return function(req, res, next) {
    req.locale = req.header('accept-language')
    logger.debug('Locale [%s] set via [accept-language] header', req.locale)
    next()
  }
}
