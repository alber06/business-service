'use strict'

const request = require('supertest')
const server  = require('./helpers/server')
const mongoose  = require('mongoose')

describe('Health e2e', () => {

  let app

  before((done) => {
    app = server.startup(done)
  })

  after((done) => {
    server.shutdown(app, done)
  })

  describe('when healty', () => {
    before(() => {
      mongoose.connection.readyState = 1
    })

    it('should return 200 with health info', () => {
      return request(app)
        .get('/health')
        .expect(200)
        .expect((res) => {
          let info = res.body
          expect(info.status).to.equal('OK')
          expect(info.pid).to.be.ok
          expect(info.uptime).to.be.ok
          expect(info.memory).to.be.ok
          expect(info.mongoose).to.be.true
        })
    })
  })

  describe('when mongoose connection is down', () => {
    before(() => {
      mongoose.connection.readyState = 0
    })
    after(() => {
      mongoose.connection.readyState = 1
    })

    it('should return 503 with health error', () => {
      return request(app)
        .get('/health')
        .expect(503)
        .expect((res) => {
          let info = res.body.error.healthInfo
          expect(info.status).to.equal('ERROR')
          expect(info.pid).to.be.ok
          expect(info.uptime).to.be.ok
          expect(info.memory).to.be.ok
          expect(info.mongoose).to.be.false
        })
    })
  })
})
