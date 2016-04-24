'use strict'

const request = require('supertest')
const server  = require('./helpers/server')

describe('Locale e2e', () => {

  let app

  before((done) => {
    app = server.startup(done)
  })

  after((done) => {
    server.shutdown(app, done)
  })

  it('should set req.locale', () => {
    return request(app)
      .get('/locale')
      .set('token', '123asdf456asdf')
      .set('accept-language', 'es')
      .expect(200)
      .expect('es')
  })
})
