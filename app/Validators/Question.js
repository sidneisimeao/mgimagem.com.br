'use strict'

class Question {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      username: 'required|min:5|max:50',
      email: 'required|min:4|max:100',
      question: 'required|min:5|max:150'
    }
  }

  get messages() {
    return {
      'question.required': 'O campo pergunta é obrigatório.',
      'question.min': 'Sua pergunta deve conter o mínimo de 10 caracteres.',
      'question.max': 'Sua pergunta deve conter no máximo de 150 caracteres.',
      'username.required': 'O campo nome é obrigatório.',
      'username.min': 'Seu nome completo deve conter o mínimo de 4 caracteres.',
      'username.max':
        'Seu nome completo deve conter no máximo de 100 caracteres.',
      'email.required': 'O campo e-mail é obrigatório.',
      'email.min': 'Seu e-mail deve conter o mínimo de 4 caracteres.',
      'email.max': 'Seu e-mail deve conter no máximo de 150 caracteres.'
    }
  }

  get sanitizationRules() {
    return {
      username: 'escape',
      email: 'normalize_email',
      question: 'escape',
      addtional: 'escape'
    }
  }
}

module.exports = Question
