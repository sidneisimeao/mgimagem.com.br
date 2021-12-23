'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })

// Post blueprint
Factory.blueprint('App/Models/User', (faker) => {
  return {
    username: 'Sidnei Simmon',
    email: 'sidneisimmon@gmail.com',
    password: 'admin123',
    created_at: faker.date()
  }
})

// Post blueprint
Factory.blueprint('App/Models/Page', (faker) => {
  return {
    name: faker.name(),
    description: faker.paragraph(),
    created_at: faker.date()
  }
})

// Post blueprint
Factory.blueprint('App/Models/Agreement', (faker) => {
  return {
    name: faker.name(),
    link: faker.url(),
    created_at: faker.date()
  }
})
