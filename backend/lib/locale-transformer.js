'use strict'

module.exports = class LocaleTransformer {
  constructor(locale) {
    this._locale = locale
  }

  get adyenLocale() {
    switch (this._locale) {
      case 'es-es': {
        return 'es_ES'
      }
      case 'en-gb': {
        return 'en_GB'
      }
      default: {
        return 'es_ES'
      }
    }
  }
}
