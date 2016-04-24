'use strict'

exports.expectErrorOnPath = (err, path) => {
  let pathError = err.errors[path]
  try {
    expect(pathError, 'expected validation error for path ' + path).to.exist
    expect(pathError.name).to.equal('ValidatorError')
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}
