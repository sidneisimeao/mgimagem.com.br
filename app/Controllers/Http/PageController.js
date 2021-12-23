'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Pages = use('App/Models/Page')

/**
 * Resourceful controller for interacting with pages
 */
class PageController {
  /**
   * Show a list of all pages.
   * GET pages
   */
  async index({ view }) {
    const pages = await Pages.query().where('id', 1).fetch()
    const data = await pages.toJSON()
    return view.render('dashboard.pages.index', { pages: data })
  }

  /**
   * Render a form to be used for creating a new page.
   * GET pages/create
   */
  async create({ view }) {
    return view.render('dashboard.user.create')
  }

  /**
   * Render a form to update an existing page.
   * GET pages/:id/edit
   */
  async edit({ params, view }) {
    const { id, name, description } = await Pages.findOrFail(params.id)
    return view.render('dashboard.pages.form', { id, name, description })
  }

  /**
   * Update page details.
   * PUT or PATCH pages/:id
   */
  async update({ params, request, response, session }) {
    if (params.id > 1) return false
    const pages = await Pages.findOrFail(params.id)
    const data = request.only(['name', 'description'])

    pages.merge(data)

    await pages.save()
    session.flash({
      success: true,
      message: 'Dados alterados com sucesso!'
    })

    return response.route('pages.index')
  }
}

module.exports = PageController
