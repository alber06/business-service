'use strict'

const logger        = require('pine')()
const City          = require('../../models').City
const formatReqRes  = require('../../lib/logger').formatReqRes
const formatError   = require('../../lib/logger').formatReqResError

module.exports = (router) => {
  router.get('/', findSearch)
  router.put('/:id/address', updateAddress)
  router.delete('/:id', deleteBusiness)
}

function findSearch(req, res) {
  if (req.query.city) {
    findByCity(req, res)
  } else {
    let error = { error: 'Invalid search params' }
    res.status(400).json(error)
    logger.error('Businesses search failed', formatError(req, res, new Error('Invalid search params')))
  }
}

function findByCity(req, res) {
  let city = req.query.city

  City.findOneAsync({ city: city })
    .then((_city) => {
      if (_city && _city.businesses.length) {
        let businesses = _city.businesses

        res.status(200).json(businesses)
        logger.info('Found %s Businesses', businesses.length, formatReqRes(req, res))
      } else {
        res.status(204).send()
        logger.info('Businesses not found', formatReqRes(req, res))
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message })
      logger.error('Find Businesses failed', formatError(req, res, err))
    })
}

function updateAddress(req, res) {
  let businessId = req.params.id
  let address    = req.body.address

  City.updateBusinessAddress(businessId, address)
    .then(() => {
      res.status(204).send()
      logger.info('Updated Business Address', formatReqRes(req, res))
    })
    .catch((err) => {
      res.status(400).json({ error: err.message })
      logger.error('Update Business Address failed', formatError(req, res, err))
    })
}

function deleteBusiness(req, res) {
  let businessId = req.params.id

  City.deleteBusiness(businessId)
    .then(() => {
      res.status(204).send()
      logger.info('Deleted Business', formatReqRes(req, res))
    })
    .catch((err) => {
      if (err.message === 'Business not found') {
        res.status(404).json({ error: err.message })
        logger.error('Business not found', formatError(req, res, err))
      } else {
        res.status(400).json({ error: err.message })
        logger.error('Delete Business failed', formatError(req, res, err))
      }
    })
}
