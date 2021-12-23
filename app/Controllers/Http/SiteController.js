'use strict'
const Database = use('Database')
const Page = use('App/Models/Page')
const Service = use('App/Models/Service')
const Agreement = use('App/Models/Agreement')
const File = use('App/Models/File')
const Helpers = use('Helpers')
const { validate, sanitizor } = use('Validator')
const Post = use('App/Models/Post')
/**
 * Resourceful controller for interacting with sites
 */
class SiteController {
  /**
   * Show a list of all sites.
   * GET sites
   */
  async index({ view }) {
    // Contents
    const content = {}

    // Page About contents
    const { id, name, description } = await Page.findByCache(1)
    content.about = { id, name, description }

    // Page Services contents
    const services = await Service.getAllByCache()
    content.services = await services.toJSON()

    // Page Agreements contents
    const agreements = await Agreement.getAllByCache()
    content.agreements = await agreements.toJSON()

    // Page Post contents
    const posts = await Database.select(
      'posts.id',
      'posts.name',
      'posts.slug',
      'posts.created_at',
      'files.id as file_id'
    )
      .from('posts')
      .join('files', 'posts.id', 'files.post_id')
      .whereRaw('date(posts.created_at) <= ?', new Date())
      .orderBy('posts.id', 'desc')
      .limit(4)

    content.posts = posts

    return view.render('site.home', { content })
  }

  /**
   * Display a single site.
   * GET sites/:id
   */
  async showPostImage({ params, response }) {
    try {
      const file = await File.findOrFail(params.id)

      return response.download(Helpers.tmpPath(`uploads/${file.file}`))
    } catch (err) {
      // Retornar imagem padrão ?
    }
  }

  /**
   * Display a single post of site
   * GET blog/post/:slug
   */
  async showBlogPost({ params, view, response, request }) {
    let slug = sanitizor.escape(params.slug || '')
    slug = sanitizor.stripTags(slug)

    const rules = {
      slug: 'required|max:300'
    }

    const validation = await validate({ slug }, rules)

    if (validation.fails()) {
      return response.redirect('back')
    }

    // Page Post contents
    const post = await Database.select(
      'posts.id',
      'posts.name',
      'posts.tags',
      'posts.description',
      'posts.author',
      'posts.created_at',
      'files.id as file_id',
      'posts.seo'
    )
      .from('posts')
      .leftJoin('files', 'posts.id', 'files.post_id')
      .where({ slug: slug })
      .first()

    if (!post) {
      return response.redirect('/blog/posts')
    }

    // Page Post contents
    const data = await Database.select('tags').from('posts')

    const allTags = await data.reduce((allTags, { tags } = { ...current }) => {
      let splitedTags = (tags || '').split(',')
      let filteredTags = splitedTags.filter((value) => value.length >= 3)

      if (filteredTags.length > 0) {
        filteredTags.map((key) => allTags.add(key))
      }
      return allTags
    }, new Set())

    const chunk = (array, size) => {
      const chunked_arr = []
      let index = 0
      while (index < array.length) {
        chunked_arr.push(array.slice(index, size + index))
        index += size
      }
      return chunked_arr
    }

    if (post.tags) {
      post.tags = post.tags.split(',').filter((value) => value.length >= 3)
    }

    post.allTags = chunk([...allTags], 3)

    return view.render('site.posts', { post, url: request.url() })
  }

  /**
   * Display a single post of site
   * GET blog/post/:slug
   */
  async searchTerm({ request, view }) {
    let { term } = request.only(['term'])

    if (term === undefined) {
      return view.render('site.search', {
        posts: [],
        term: '',
        count: 0,
        message: ''
      })
    }

    term = sanitizor.escape(term)
    term = sanitizor.stripTags(term)

    const validation = await validate(
      { term },
      {
        term: 'required|min:3|max:300'
      }
    )

    if (validation.fails()) {
      return view.render('site.search', {
        posts: [],
        term: '',
        count: 0,
        message: 'Nenhum resultado encontrado'
      })
    }

    const posts = await Post.search(term)
    const count = await posts.reduce((total) => ++total, 0)

    return view.render('site.search', {
      posts,
      term,
      count,
      message: count === 0 ? 'Nenhum resultado encontrado' : ''
    })
  }

  /**
   * Display a single post of site
   * GET blog/post/:slug
   */
  async posts({ view, params }) {
    let pageActive = Number(params.id) || 1
    // Page Post contents
    let { total, perPage, page, lastPage, data } = await Database.select(
      'posts.id',
      'posts.name',
      'posts.tags',
      'posts.slug',
      'posts.created_at',
      'files.id as file_id'
    )
      .from('posts')
      .leftJoin('files', 'posts.id', 'files.post_id')
      .orderBy('posts.id', 'desc')
      .paginate(pageActive, 14)

    const prevPage = pageActive > 1 ? pageActive - 1 : 1
    const nextPage = pageActive < total ? pageActive + 1 : total

    const pages = new Array(lastPage)

    return view.render('site.all-posts', {
      total,
      perPage,
      page,
      lastPage,
      data,
      pages,
      prevPage,
      nextPage,
      pageActive
    })
  }

  async examesweb({ view }) {
    return view.render('site.laudos')
  }

  async drResponse({ view, params }) {
    let pageActive = Number(params.id) || 1

    // Page Post contents
    let { total, perPage, page, lastPage, data } = await Database.select(
      'pages.id',
      'pages.name',
      'pages.description',
      'pages.created_at',
      'pages.updated_at',
      'pages.response',
      'pages.username',
      'pages.email',
      'pages.ip',
      'pages.url',
      'pages.original_url',
      'pages.method',
      'pages.intended'
    )
      .from('pages')
      .where('id', '>', 1)
      .where('intended', '=', 'S')
      .orderBy('pages.id', 'desc')
      .paginate(pageActive, 20)

    const prevPage = pageActive > 1 ? pageActive - 1 : 1
    const nextPage = pageActive < total ? pageActive + 1 : total

    const pages = new Array(lastPage)

    return view.render('site.dr-response', {
      total,
      perPage,
      page,
      lastPage,
      data,
      pages,
      prevPage,
      nextPage,
      pageActive
    })
  }

  async pergunta({ session, params, request, response, view }) {
    const { username, email, question, addtional } = request.all()

    const log = {}
    log.ip = request.ip()
    log.url = request.url()
    log.original_url = request.originalUrl()
    log.method = request.method()

    const checkQuestion = await Page.query()
      .where({ ip: log.ip, intended: 'N' })
      .getCount()

    if (checkQuestion > 0) {
      session
        .withErrors({
          question: 'Você já possui uma pergunta aguardando resposta.'
        })
        .flashExcept(['question'])

      return response.redirect('back')
    }

    await Page.create({
      intended: 'N',
      name: username,
      username,
      email,
      description: question,
      addtional: addtional.substring(0, 249),
      ...log
    })

    session.flash({
      success: true,
      message:
        'Pergunta enviada com sucesso! Volte ao site em breve para saber a resposta.'
    })

    return response.route('site.dr-response')
  }
}

module.exports = SiteController
