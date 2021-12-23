'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceTokenSchema extends Schema {
  up() {
    this.table('users', (table) => {
      table.string('service_token', 100)
      table.date('token_created_at', 100)
    })
  }

  down() {
    this.table('users', (table) => {
      table.dropColumn('serviceToken')
    })
  }
}

module.exports = ServiceTokenSchema
