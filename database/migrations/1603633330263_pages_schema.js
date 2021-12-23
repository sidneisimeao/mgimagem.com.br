'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PagesSchema extends Schema {
  up() {
    this.table('pages', (table) => {
      table.string('addtional', 249)
    })
  }

  down() {
    this.table('pages', (table) => {
      table.dropColumn('addtional')
    })
  }
}

module.exports = PagesSchema
