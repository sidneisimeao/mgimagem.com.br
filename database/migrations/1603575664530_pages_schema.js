'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PagesSchema extends Schema {
  up() {
    this.table('pages', (table) => {
      table.string('username', 80)
      table.string('email', 254)
      table.string('ip', 80)
      table.text('url')
      table.text('original_url')
      table.string('method', 50)
      table.string('intended', 50)
    })
  }

  down() {
    this.table('pages', (table) => {
      table.dropColumn('username', 80)
      table.dropColumn('email', 254)
      table.dropColumn('ip', 80)
      table.dropColumn('url')
      table.dropColumn('original_url')
      table.dropColumn('method', 50)
      table.dropColumn('intended', 50)
    })
  }
}

module.exports = PagesSchema
