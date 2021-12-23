'use strict'

const moment = use('moment')
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')
const Env = use('Env')
const Database = use('Database')

class ForgotPasswordController {
  async index({ view }) {
    return view.render('auth.forgot')
  }

  async edit({ view, params }) {
    return view.render('auth.forgot-edit', { token: params.token })
  }

  async store({ request, response, session }) {
    // Inicia uma transação no banco
    const trx = await Database.beginTransaction()
    const email = request.input('email')
    try {
      const user = await User.findByOrFail('email', email)

      const token = crypto.randomBytes(10).toString('hex')

      user.service_token = token
      user.token_created_at = new Date()
      await user.save()

      await Mail.send(
        ['emails.forgot_password'],
        {
          email,
          token: token,
          link: `${Env.get('APP_URL')}/dashboard/passwords-edit/${token}`
        },
        (message) => {
          message
            .to(user.email)
            .from('sidneisimmon@gmail.com', 'Sidnei Simmon')
            .subject('Recuperação de senha')
        }
      )
    } catch (err) {
      // Caso houver uma transação em andamento desfaz
      if (trx) {
        // Faz rolback
        await trx.rollback()
      }
      return response.redirect('back')
    }
    // Cria mensagem
    session.flash({
      success: true,
      message: `Um email foi enviado para ${email} com as intruções para recuperar a senha!`
    })
    // Commit
    await trx.commit()

    // Retona a rota
    return response.route('auth.forgot')
  }

  async update({ request, response, session, view }) {
    // Inicia uma transação no banco
    const trx = await Database.beginTransaction()
    const { token, password } = request.all()
    try {
      const user = await User.findByOrFail('service_token', token)

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        // Cria mensagem
        session.flash({
          success: true,
          message: `Este link esta expirado.`
        })
        // Retona a rota
        return response.route('auth.passwords-edit', { token })
      }

      user.service_token = null
      user.token_created_at = null
      user.password = password

      await user.save()

      // Cria mensagem
      session.flash({
        success: true,
        message: `Senha alterada com sucesso. Faça login novamente.`
      })
    } catch (err) {
      // Caso houver uma transação em andamento desfaz
      if (trx) {
        // Faz rolback
        await trx.rollback()
      }
      // Cria mensagem
      session.flash({
        success: true,
        message: `Este link esta expirado.`
      })
      // Retona a rota
      return response.route('auth.passwords-edit', { token })
    }
    // Commit
    await trx.commit()
    // Retona a rota
    return response.route('auth.index')
  }
}

module.exports = ForgotPasswordController
