'use strict'

const request = require('supertest')
const server  = require('./helpers/server')
const _       = require('underscore')
const City    = require('../models').City


describe('Business e2e', () => {

  let app

  before((done) => {
    app = server.startup(done)
  })

  after((done) => {
    server.shutdown(app, done)
  })

  afterEach(() => {
    return City.remove()
  })

  describe('GET /business?city', () => {
    describe('when there are businesses in a city', () => {
      beforeEach(() => {
        return createCities()
      })

      it('should return them', (done) => {
        request(app)
          .get('/business/')
          .query({city: 'Barcelona'})
          .expect(200)
          .expect('Content-Type', /json/)
          .expect((res) => {
            expect(res.body.length).to.equal(3)
          })
          .end(done)
      })
    })

    describe('when there aren\'t cities', () => {
      it('should get no content', (done) => {
        request(app)
          .get('/business/')
          .query({city: 'Madrid'})
          .expect(204)
          .expect({})
          .end(done)
      })
    })
  })

  describe('PUT /business/:id/address', () => {
    describe('when business exists', () => {
      beforeEach(() => {
        return createCities()
      })

      it('should update the address', (done) => {
        let newAddress = { address: 'newAddress, 4' }

        request(app)
          .put('/business/BAR123456/address')
          .send(newAddress)
          .expect(204)
          .expect({})
          .end((err) => {
            if (err) {return done(err)}
            City.findOneAsync({'businesses.id': 'BAR123456'})
              .then((_city) => {
                let business = _.find(_city.businesses, (_business) => {
                  return _business.id === 'BAR123456'
                })

                expect(business).to.exist
                expect(business.address).to.equal(newAddress.address)
              })
              .then(done).catch(done)
          })
      })
    })

    describe('when address is empty', () => {
      beforeEach(() => {
        return createCities()
      })

      it('should throw an error', (done) => {
        let newAddress = { address: null }

        request(app)
          .put('/business/BAR123456/address')
          .send(newAddress)
          .expect(400)
          .expect('Content-Type', /json/)
          .expect((res) => {
            expect(res.body.error).to.exist
          })
          .end(done)
      })
    })

    describe('when business doesn\'t exist', () => {
      it('should throw an error', (done) => {
        let newAddress = { address: 'newAddress' }

        request(app)
          .put('/business/BAR123456/address')
          .send(newAddress)
          .expect(400)
          .expect('Content-Type', /json/)
          .expect((res) => {
            expect(res.body.error).to.exist
          })
          .end(done)
      })
    })

    describe('when there aren\'t cities', () => {
      it('should get no content', (done) => {
        request(app)
          .get('/business/')
          .query({city: 'Madrid'})
          .expect(204)
          .expect({})
          .end(done)
      })
    })
  })

  describe('DELETE /:id', () => {
    describe('when business exists', () => {
      beforeEach(() => {
        return createCities()
      })

      it('should delete it', (done) => {
        request(app)
          .delete('/business/BAR123456')
          .expect(204)
          .expect({})
          .end((err) => {
            if (err) {return done(err)}
            City.findOneAsync({city: 'Barcelona'})
              .then((_city) => {
                expect(_city.businesses.length).to.equal(2)
              })
              .then(done).catch(done)
          })
      })
    })

    describe('when business doesn\'t exists', () => {
      it('should throw an error', (done) => {
        request(app)
          .delete('/business/BAR123456')
          .expect(404)
          .expect('Content-Type', /json/)
          .expect((res) => {
            expect(res.body.error).to.exist
          })
          .end(done)
      })
    })
  })

  function createCities() {
    let madrid = {
      city:       'Madrid',
      country:    'ES',
      businesses: []
    }
    let barcelona = {
      city:       'Barcelona',
      country:    'ES',
      businesses: [
        {
          id: 'BAR123456',
          name: 'Business1',
          address: 'Address1, 1'
        },
        {
          id: 'BAR789101112',
          name: 'Business2',
          address: 'Address2, 2'
        },
        {
          id: 'BAR131415161718',
          name: 'Business3',
          address: 'Address3, 3'
        }
      ]
    }

    return City.createAsync(madrid)
      .then(() => {
        return City.createAsync(barcelona)
      })
  }
})
