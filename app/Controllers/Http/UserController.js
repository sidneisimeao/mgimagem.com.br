'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')
/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   */
  async index({ view }) {
    const users = await User.all()
    const data = await users.toJSON()
    return view.render('dashboard.user.index', { users: data })
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   */
  async create({ view }) {
    return view.render('dashboard.user.create')
  }

  /**
   * Create/save a new user.
   * POST users
   */
  async store({ request, response, session }) {
    const data = request.only(['username', 'email', 'password'])

    await User.create(data)
    session.flash({
      success: true,
      message: 'Usuário criado com sucesso!'
    })
    return response.redirect('users/create')
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   */
  async edit({ auth, view }) {
    const { id, username, email } = await User.findOrFail(auth.user.id)
    return view.render('dashboard.user.edit', { id, username, email })
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   */
  async update({ request, auth, session, response }) {
    const user = await User.findOrFail(auth.user.id)
    const data = request.only(['username', 'email'])

    user.merge(data)

    await user.save()
    session.flash({
      success: true,
      message: 'Dados alterados com sucesso!'
    })

    return response.route('users.index')
  }
}

module.exports = UserController
