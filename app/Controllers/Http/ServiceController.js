'use strict'

const Service = use('App/Models/Service')
/**
 * Resourceful controller for interacting with services
 */
class ServiceController {
  /**
   * Show a list of all services.
   * GET services
   */
  async index({ view }) {
    const services = await Service.all()
    const data = await services.toJSON()
    return view.render('dashboard.services.index', { services: data })
  }

  /**
   * Render a form to be used for creating a new service.
   * GET services/create
   */
  async create({ view }) {
    return view.render('dashboard.services.form')
  }

  /**
   * Create/save a new service.
   * POST services
   */
  async store({ request, response, session }) {
    const data = request.only(['name', 'description', 'icon'])

    await Service.create(data)
    session.flash({
      success: true,
      message: 'Serviço criado com sucesso!'
    })
    return response.route('services.index')
  }

  /**
   * Render a form to update an existing service.
   * GET services/:id/edit
   */
  async edit({ params, view }) {
    const { id, name, description, icon } = await Service.findOrFail(params.id)
    return view.render('dashboard.services.form', {
      id,
      name,
      description,
      icon
    })
  }

  /**
   * Update service details.
   * PUT or PATCH services/:id
   */
  async update({ params, request, session, response }) {
    const services = await Service.findOrFail(params.id)
    const data = request.only(['name', 'description', 'icon'])

    services.merge(data)

    await services.save()
    session.flash({
      success: true,
      message: 'Dados alterados com sucesso!'
    })

    return response.route('services.index')
  }

  /**
   * Delete a service with id.
   * DELETE services/:id
   */
  async destroy({ params, session, response }) {
    const service = await Service.findOrFail(params.id)
    await service.delete()

    session.flash({
      success: true,
      message: 'Dados excluidos com sucesso!'
    })

    return response.route('services.index')
  }
}

module.exports = ServiceController
