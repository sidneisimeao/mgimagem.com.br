'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up() {
    this.table('posts', (table) => {
      table.string('slug', 245)
      table.text('tags')
    })
  }

  down() {
    this.table('posts', (table) => {
      table.dropColumn('slug')
      table.dropColumn('tags')
    })
  }
}

module.exports = PostSchema
