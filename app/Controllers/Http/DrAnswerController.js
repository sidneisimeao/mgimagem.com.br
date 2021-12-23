'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Pages = use('App/Models/Page')

/**
 * Resourceful controller for interacting with pages
 */
class DrAnswerController {
  /**
   * Show a list of all pages.
   * GET pages
   */
  async index({ view }) {
    const pages = await Pages.query().where('id', '>', 1).fetch()
    const data = await pages.toJSON()
    return view.render('dashboard.dr-responde.index', { pages: data })
  }

  /**
   * Render a form to update an existing page.
   * GET pages/:id/edit
   */
  async edit({ params, view }) {
    const { id, name, description, response } = await Pages.findOrFail(
      params.id
    )
    return view.render('dashboard.dr-responde.form', {
      id,
      name,
      description,
      response
    })
  }

  /**
   * Update page details.
   * PUT or PATCH pages/:id
   */
  async update({ params, request, response, session }) {
    if (params.id < 2) return false
    const pages = await Pages.findOrFail(params.id)
    const data = request.only([
      'name',
      'description',
      'response',
      'username',
      'email'
    ])

    pages.merge(data)

    await pages.save()
    session.flash({
      success: true,
      message: 'Dados alterados com sucesso!'
    })

    return response.route('dr-responde.index')
  }

  /**
   * Delete a agreement with id.
   * DELETE agreements/:id
   */
  async destroy({ params, response, session }) {
    if (params.id < 2) return false
    const pages = await Pages.findOrFail(params.id)
    await pages.delete()

    session.flash({
      success: true,
      message: 'Dados excluidos com sucesso!'
    })

    return response.route('dr-responde.index')
  }
}

module.exports = DrAnswerController
