'use strict'

const mongoose     = require('mongoose')
const _            = require('underscore')
const valueObjects = require('./value-objects')
const Business     = valueObjects.business

const citySchema = new mongoose.Schema({
  country:   { type: String, required: true },
  city:      { type: String, required: true, unique: true },
  businesses: [ Business ]
})

citySchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.id
    delete ret.businesses
  }
})

citySchema.statics.updateBusinessAddress = function(businessId, address) {
  return this.findOneAsync({ 'businesses.id': businessId })
    .then((_city) => {
      if (!_city) {
        return Promise.reject(new Error('Business not found'))
      }
      let index = _.findIndex(_city.businesses)

      _city.businesses[index].address = address
      return _city.saveAsync()
    })
}

citySchema.statics.deleteBusiness = function(businessId) {
  return this.findOneAsync({ 'businesses.id': businessId })
    .then((_city) => {
      let index

      if (!_city) {
        return Promise.reject(new Error('Business not found'))
      }
      index = _.findIndex(_city.businesses)
      _city.businesses.splice(index, 1)

      return _city.saveAsync()
    })
}

const City = mongoose.model('City', citySchema)

module.exports.City = City
module.exports.modelSchema = citySchema
