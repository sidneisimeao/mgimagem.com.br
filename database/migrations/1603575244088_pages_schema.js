'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PagesSchema extends Schema {
  up() {
    this.table('pages', (table) => {
      table.text('response')
    })
  }

  down() {
    this.table('pages', (table) => {
      table.dropColumn('response')
    })
  }
}

module.exports = PagesSchema
