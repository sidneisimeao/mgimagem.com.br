'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up() {
    this.create('posts', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.text('description')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down() {
    this.drop('posts')
  }
}

module.exports = PostSchema
