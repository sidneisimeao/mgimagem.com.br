'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LogSchema extends Schema {
  up() {
    this.create('logs', (table) => {
      table.increments()
      table.string('username', 80)
      table.string('email', 254)
      table.string('ip', 80)
      table.text('url')
      table.text('original_url')
      table.string('method', 50)
      table.string('intended', 50)
      table.timestamps()
    })
  }

  down() {
    this.drop('logs')
  }
}

module.exports = LogSchema
