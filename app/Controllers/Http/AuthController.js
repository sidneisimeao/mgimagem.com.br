'use strict'
const User = use('App/Models/User')
/**
 * Resourceful controller for interacting with auths
 */
class AuthController {
  /**
   * Show a list of all auths.
   * GET auths
   */
  async index({ view, response, auth }) {
    if (!auth.user) {
      return view.render('auth.register')
    }
    return response.route('dashboard.index')
  }

  /**
   * Try login
   */
  async login({ request, auth, response }) {
    const { email, password } = request.all()
    await auth.attempt(email, password)

    return response.route('dashboard.index')
  }

  /**
   * Try logout
   */
  async logout({ auth, response }) {
    await auth.logout()
    return response.route('/')
  }
}

module.exports = AuthController
