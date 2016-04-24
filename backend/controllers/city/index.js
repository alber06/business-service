'use strict'

const logger        = require('pine')()
const City          = require('../../models').City
const formatReqRes  = require('../../lib/logger').formatReqRes
const formatError   = require('../../lib/logger').formatReqResError

module.exports = (router) => {
  router.get('/', findAll)
}

function findAll(req, res) {
  City.findAsync()
    .then((cities) => {
      if (cities && cities.length) {
        res.status(200).json(cities)
        logger.info('Found %s Cities', cities.length, formatReqRes(req, res))
      } else {
        res.status(204).send()
        logger.info('Cities not found', formatReqRes(req, res))
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message })
      logger.error('Find All Cities failed', formatError(req, res, err))
    })
}
