'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { response, session }) {
    if (error.name === 'ValidationException') {
      session.withErrors(error.messages).flashAll()
      await session.commit()
      response.redirect('back')
      return
    }
    // Sessão expirada
    if (error.name === 'InvalidSessionException') {
      return response.route('auth.index')
    }

    // Rota não enocntrada
    if (error.name === 'HttpException') {
      return response.redirect('/')
    }

    // Id da busca não enocontrado
    if (error.name === 'ModelNotFoundException') {
      return response.redirect('/')
    }

    // Usuário tenta refazer login sem logout
    if (error.code === 'E_CANNOT_LOGIN') {
      return response.route('auth.logout')
    }

    return super.handle(...arguments)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {}
}

module.exports = ExceptionHandler
