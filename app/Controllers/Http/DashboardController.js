'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with dashboards
 */
class DashboardController {
  /**
   * Show a list of all dashboards.
   * GET dashboards
   */
  async index({ view }) {
    return view.render('dashboard.index')
  }
}

module.exports = DashboardController
