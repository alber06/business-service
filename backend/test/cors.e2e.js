'use strict'

const request = require('supertest')
const server  = require('./helpers/server')

describe('Cors e2e', () => {

  let app

  before((done) => {
    app = server.startup(done)
  })

  after((done) => {
    server.shutdown(app, done)
  })

  describe('preflight requests', () => {
    it('should set header Access-Control-Allow-Origin', () => {
      return request(app)
        .options('/cors')
        .set('Origin', 'http://e2e.business-service.test')
        .expect(204)
        .expect('Access-Control-Allow-Origin', 'http://e2e.business-service.test')
    })
    it('should set header Access-Control-Allow-Methods', () => {
      return request(app)
        .options('/cors')
        .expect(204)
        .expect('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    })
    it('should set header Access-Control-Allow-Headers', () => {
      return request(app)
        .options('/cors')
        .expect(204)
        .expect(
          'Access-Control-Allow-Headers',
          'Authorization,X-Requested-With,Origin,Content-Type,Accept,token,lang,version')
    })
    it('should set header Access-Control-Allow-Credentials', () => {
      return request(app)
        .options('/cors')
        .expect(204)
        .expect('Access-Control-Allow-Credentials', 'true')
    })
  })

  describe('standard requests', () => {
    it('should set header Access-Control-Allow-Origin', () => {
      return request(app)
        .get('/cors')
        .set('Origin', 'http://e2e.business-service.test')
        .set('token', '123asdf456asdf')
        .expect(204)
        .expect('Access-Control-Allow-Origin', 'http://e2e.business-service.test')
    })
    it('should set header Access-Control-Allow-Credentials', () => {
      return request(app)
        .get('/cors')
        .set('token', '123asdf456asdf')
        .expect(204)
        .expect('Access-Control-Allow-Credentials', 'true')
    })
  })
})
