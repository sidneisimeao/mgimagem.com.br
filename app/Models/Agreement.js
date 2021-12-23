'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const CacheService = use('App/Services/Cache')
const ttl = 60 * 1 // cache for 1 min
const cache = new CacheService(ttl)

class Agreement extends Model {
  static getAllByCache() {
    return cache.get('agreementsPage', () => {
      let services = this.all()
      return services
    })
  }
}

module.exports = Agreement
