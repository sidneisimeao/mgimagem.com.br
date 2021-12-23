const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const View = use('View')
  const Env = use('Env')

  View.global('APP_URL', function () {
    return Env.get('APP_URL')
  })

  View.global('currentDate', function () {
    return new Date().getFullYear()
  })

  View.global('safe', function (text) {
    return this.safe(text)
  })

  View.global('getNavBarItems', function () {
    return [
      {
        id: 1,
        title: 'Usuários do Sistema',
        description: 'Gerenciar',
        icon: 'fa-users',
        items: [
          { route: 'users.create', name: 'Novo usuário' },
          { route: 'users.index', name: 'Todos usuários' }
        ]
      },
      {
        id: 2,
        title: 'Página Sobre Nós',
        description: 'Gerenciar',
        icon: 'fa-file',
        items: [{ route: 'pages.index', name: 'Editar Página' }]
      },
      {
        id: 3,
        title: 'Página Convênios',
        description: 'Gerenciar',
        icon: 'fa-handshake',
        items: [
          { route: 'agreements.create', name: 'Novo Convênio' },
          { route: 'agreements.index', name: 'Todos Convênios' }
        ]
      },
      {
        id: 4,
        title: 'Página Blog',
        description: 'Gerenciar',
        icon: 'fa-scroll',
        items: [
          { route: 'posts.create', name: 'Nova Postagem' },
          { route: 'posts.index', name: 'Todas Postagens' }
        ]
      },
      {
        id: 5,
        title: 'Página Serviços',
        description: 'Gerenciar',
        icon: 'fa-cog',
        items: [
          { route: 'services.create', name: 'Novo Serviço' },
          { route: 'services.index', name: 'Todos Serviços' }
        ]
      },
      {
        id: 6,
        title: 'Dr Responde',
        description: 'Gerenciar perguntas',
        icon: 'fa-question',
        items: [{ route: 'dr-responde.index', name: 'Perguntas & Repostas' }]
      },
      {
        id: 7,
        title: 'Registro de Atividades',
        description: 'Gerenciar',
        icon: 'fa-history',
        items: [{ route: 'log.index', name: 'Logs' }]
      }
    ]
  })
})
