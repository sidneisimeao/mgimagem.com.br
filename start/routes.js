'use strict'

const Route = use('Route')

// Página Inicial
Route.get('/', 'SiteController.index').as('site.index')

// Rota imagem pública
Route.get('images/:id', 'SiteController.showPostImage').as('site.showPostImage')

// Rota do post
Route.get('blog/post/:slug', 'SiteController.showBlogPost').as(
  'site.showBlogPost'
)

// Sistema de exames
Route.get('dr-response/:id?', 'SiteController.drResponse').as(
  'site.dr-response'
)

// Sistema de exames
Route.post('pergunta/', 'SiteController.pergunta')
  .as('site.pergunta')
  .validator('Question')

// Sistema de exames
Route.get('examesweb', 'SiteController.examesweb').as('site.examesweb')

// Rota do post
Route.get('search/:term?', 'SiteController.searchTerm').as('site.searchTerm')

// Rota de todos posts
Route.get('blog/posts/:id?', 'SiteController.posts').as('site.posts')

Route.group(() => {
  // Formulário de Login
  Route.get('/', 'AuthController.index').as('auth.index')

  // Formulário de Login
  Route.get('/forgot', 'ForgotPasswordController.index').as('auth.forgot')

  Route.post('/passwords', 'ForgotPasswordController.store')
    .validator('ForgotPassword')
    .as('auth.passwords')

  Route.get('/passwords-edit/:token', 'ForgotPasswordController.edit').as(
    'auth.passwords-edit'
  )

  Route.put('passwords-reset', 'ForgotPasswordController.update')
    .validator('ResetPassword')
    .as('auth.passwords-reset')

  // Tenta fazer o login usando dados do cliente
  Route.post('/login', 'AuthController.login')
    .validator('LoginUser')
    .as('auth.login')
}).prefix('dashboard')

Route.group(() => {
  // Página inicial de login
  Route.get('/log', 'LogController.index').as('log.index')

  // Página inicial de login
  Route.get('/welcome', 'DashboardController.index').as('dashboard.index')

  // Logoff
  Route.get('/logout', 'AuthController.logout').as('auth.logout')

  // User
  Route.resource('users', 'UserController')
    .except(['show', 'destroy'])
    .validator(
      new Map([
        [['users.store'], ['UserStore']],
        [['users.update'], ['UserUpdate']]
      ])
    )

  // Páginas
  Route.resource('dr-responde', 'DrAnswerController').validator(
    new Map([[['dr-responde.update'], ['PageUpdate']]])
  )
  //.except(['create', 'show', 'destroy'])

  // Páginas
  Route.resource('pages', 'PageController')
    .validator(new Map([[['pages.update'], ['PageUpdate']]]))
    .except(['create', 'show', 'destroy'])

  // Páginas
  Route.resource('agreements', 'AgreementController').validator(
    new Map([
      [['agreements.store'], ['AgreementSave']],
      [['agreements.update'], ['AgreementSave']]
    ])
  )

  // Postagens
  Route.resource('posts', 'PostController').validator(
    new Map([
      [['posts.store'], ['PostSave']],
      [['posts.update'], ['PostSave']]
    ])
  )

  // Postagens
  Route.resource('files', 'FileController').validator(
    new Map([[['files.update'], ['Files']]])
  )

  // Postagens
  Route.resource('services', 'ServiceController').validator(
    new Map([
      [['services.store'], ['Services']],
      [['services.update'], ['Services']]
    ])
  )
})
  .prefix('dashboard')
  .middleware(['auth', 'log'])
