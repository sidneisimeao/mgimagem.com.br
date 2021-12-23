'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgreementsSchema extends Schema {
  up() {
    this.create('agreements', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('link', 249)
      table.timestamps()
    })
  }

  down() {
    this.drop('agreements')
  }
}

module.exports = AgreementsSchema
