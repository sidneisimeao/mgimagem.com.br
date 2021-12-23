'use strict'

class LoginUser {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email.required': 'E-mail obrigatório.',
      'email.email': 'E-mail invalido.',
      'password.required': 'Senha obrigatória.'
    }
  }
  get sanitizationRules() {
    return {
      email: 'normalize_email',
      password: 'escape'
    }
  }
}

module.exports = LoginUser
