'use strict'

const request = require('supertest')
const server  = require('./helpers/server')
const City    = require('../models').City


describe('City e2e', () => {

  let app, city1, city2

  before((done) => {
    app = server.startup(done)
  })

  after((done) => {
    server.shutdown(app, done)
  })

  afterEach(() => {
    return City.remove()
  })

  describe('GET /city', () => {
    describe('when there are cities', () => {
      beforeEach(() => {
        return createCities()
      })

      it('should return them', (done) => {
        request(app)
          .get('/city/')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect((res) => {
            expect(res.body.length).to.equal(2)
          })
          .end(done)
      })
    })

    describe('when there aren\'t cities', () => {
      it('should get no content', (done) => {
        request(app)
          .get('/city/')
          .expect(204)
          .expect({})
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
      businesses: []
    }

    return City.createAsync(madrid)
      .then((_city) => {
        city1 = _city
        return City.createAsync(barcelona)
      })
      .then((_city) => {
        city2 = _city
      })
  }
})
