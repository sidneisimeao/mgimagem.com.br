'use strict'

const Agreements = use('App/Models/Agreement')
/**
 * Resourceful controller for interacting with agreements
 */
class AgreementController {
  /**
   * Show a list of all agreements.
   * GET agreements
   */
  async index({ view }) {
    const agreements = await Agreements.all()
    const data = await agreements.toJSON()
    return view.render('dashboard.agreements.index', { agreements: data })
  }

  /**
   * Render a form to be used for creating a new agreement.
   * GET agreements/create
   */
  async create({ view }) {
    return view.render('dashboard.agreements.form')
  }

  /**
   * Create/save a new agreement.
   * POST agreements
   */
  async store({ request, response, session }) {
    const data = request.only(['name', 'link'])

    await Agreements.create(data)
    session.flash({
      success: true,
      message: 'Convênio criado com sucesso!'
    })
    return response.route('agreements.index')
  }

  /**
   * Render a form to update an existing agreement.
   * GET agreements/:id/edit
   */
  async edit({ params, view }) {
    const { id, name, link } = await Agreements.findOrFail(params.id)
    return view.render('dashboard.agreements.form', { id, name, link })
  }

  /**
   * Update agreement details.
   * PUT or PATCH agreements/:id
   */
  async update({ params, request, response, session }) {
    const agreement = await Agreements.findOrFail(params.id)
    const data = request.only(['name', 'link'])

    agreement.merge(data)

    await agreement.save()
    session.flash({
      success: true,
      message: 'Dados alterados com sucesso!'
    })

    return response.route('agreements.index')
  }

  /**
   * Delete a agreement with id.
   * DELETE agreements/:id
   */
  async destroy({ params, response, session }) {
    const agreement = await Agreements.findOrFail(params.id)
    await agreement.delete()

    session.flash({
      success: true,
      message: 'Dados excluidos com sucesso!'
    })

    return response.route('agreements.index')
  }
}

module.exports = AgreementController
