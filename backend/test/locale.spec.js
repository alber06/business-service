'use strict'

const locale = require('../lib/locale')()

describe('Locale middleware', () => {
  let req, res

  before((done) => {
    req = {
      header: sinon.stub().returns('es')
    }
    res = 'response will not change'
    locale(req, res, done)
  })

  it('should set req.locale to accept-language header value', () => {
    expect(req.locale).to.equal('es')
  })

  it('should not modify the response', () => {
    expect(res).to.deep.equal('response will not change')
  })
})
