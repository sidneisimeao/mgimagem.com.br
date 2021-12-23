'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up() {
    this.table('posts', (table) => {
      table.text('seo', 500)
    })
  }

  down() {
    this.table('posts', (table) => {
      table.dropColumn('seo')
    })
  }
}

module.exports = PostSchema
