'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Logger = use('App/Models/Log')

class Log {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, auth }, next) {
    // call next to advance the request

    if (request.originalUrl().indexOf('/log') === -1) {
      const log = new Logger()
      log.ip = request.ip()
      log.url = request.url()
      log.original_url = request.originalUrl()
      log.method = request.method()

      let humanMethod = 'Vizualizou'

      switch (request.intended()) {
        case 'POST':
          humanMethod = 'Criou'
          break
        case 'PUT':
          humanMethod = 'Alterou'
          break
        case 'DELETE':
          humanMethod = 'Deletou'
          break
      }

      log.intended = humanMethod

      if (auth.user) {
        log.username = auth.user.username
        log.email = auth.user.email
      }

      await log.save()
    }

    await next()
  }
}

module.exports = Log
