'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up() {
    this.table('posts', (table) => {
      table.string('author', 100)
    })
  }

  down() {
    this.table('posts', (table) => {
      table.dropColumn('author')
    })
  }
}

module.exports = PostSchema
