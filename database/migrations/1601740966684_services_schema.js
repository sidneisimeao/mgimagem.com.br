'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServicesSchema extends Schema {
  up() {
    this.create('services', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.text('description')
      table.string('icon', 20)
      table.timestamps()
    })
  }

  down() {
    this.drop('services')
  }
}

module.exports = ServicesSchema
