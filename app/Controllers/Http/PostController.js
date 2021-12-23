'use strict'

const Posts = use('App/Models/Post')
const File = use('App/Models/File')
const Helpers = use('Helpers')
const Database = use('Database')
const fs = require('fs')
/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   */
  async index({ view }) {
    const posts = await Database.select(
      'posts.id',
      'posts.name',
      'posts.created_at',
      'posts.updated_at',
      'posts.author',
      'posts.tags',
      'posts.slug',
      'posts.seo',
      'files.id as file_id',
      'files.type as file_type'
    )
      .from('posts')
      .leftJoin('files', 'posts.id', 'files.post_id')

    return view.render('dashboard.posts.index', { posts })
  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   */
  async create({ view }) {
    return view.render('dashboard.posts.form')
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth, session }) {
    const data = request.only([
      'name',
      'description',
      'author',
      'tags',
      'seo',
      'created_at'
    ])

    // 2020-11-14T18:51:51.808Z
    // 20-11-2020
    data.created_at = data.created_at
      .split('-')
      .map((item, indice) => {
        return item - (indice % 2)
      })
      .reverse()

    await Posts.create({ user_id: auth.user.id, ...data })
    session.flash({
      success: true,
      message: 'Postagem criada com sucesso!'
    })
    return response.route('posts.index')
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   */
  async edit({ params, view }) {
    const {
      id,
      name,
      description,
      tags,
      slug,
      author,
      seo,
      created_at
    } = await Posts.findOrFail(params.id)

    return view.render('dashboard.posts.form', {
      id,
      name,
      description,
      tags,
      slug,
      author,
      seo,
      created_at: created_at
        .toISOString()
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-')
    })
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   */
  async update({ params, request, response, session }) {
    const post = await Posts.findOrFail(params.id)
    const data = request.only([
      'name',
      'description',
      'author',
      'tags',
      'seo',
      'created_at'
    ])

    // 2020-11-14T18:51:51.808Z
    // 20-11-2020
    let createdAt = data.created_at
      .split('-')
      .map((item, indice) => {
        return item - (indice % 2)
      })
      .reverse()

    data.created_at = new Date(...createdAt)

    post.merge(data)

    await post.save()
    session.flash({
      success: true,
      message: 'Dados alterados com sucesso!'
    })

    return response.route('posts.index')
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   */
  async destroy({ params, response, session }) {
    // Inicia uma transação no banco
    const trx = await Database.beginTransaction()

    try {
      const post = await Posts.findOrFail(params.id)

      if (post.id) {
        // Busca no banco
        const file = await File.findBy('post_id', post.id)
        if (file) {
          // Se hovuer imagem
          if (fs.existsSync(Helpers.tmpPath('uploads') + '/' + file.file)) {
            // Remove a imagem antiga
            fs.unlinkSync(Helpers.tmpPath('uploads') + '/' + file.file)
          }
          // Remove o registro
          await file.delete()
        }
      }

      await post.delete()

      session.flash({
        success: true,
        message: 'Dados excluidos com sucesso!'
      })
    } catch (err) {
      // Caso houver uma transação em andamento desfaz
      if (trx) {
        // Faz rolback
        await trx.rollback()
      }
      return response.redirect('back')
    }
    // Commit
    await trx.commit()
    return response.route('posts.index')
  }
}

module.exports = PostController
