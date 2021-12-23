'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const slugify = require('slugify')
const Database = use('Database')

class Post extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (postInstance) => {
      const created_at = new Date()
      if (postInstance.name) {
        postInstance.slug = await slugify(
          created_at.toISOString().slice(0, 10) +
            '-' +
            String(postInstance.name).toLowerCase()
        ).replace(':', '')
      }

      postInstance.description = postInstance.description.replace(
        '<table',
        '<table class="table table-striped"'
      )
    })
  }
  file() {
    return this.hasOne('App/Models/File')
  }

  static search(term) {
    // Page Post contents
    const posts = Database.select(
      'posts.id',
      'posts.name',
      'posts.tags',
      'posts.author',
      'posts.slug',
      'posts.created_at'
    )
      .from('posts')
      .where('posts.name', 'LIKE', '%' + term + '%')
      .orWhere('posts.tags', 'LIKE', '%' + term + '%')

    return posts
  }
}

module.exports = Post
