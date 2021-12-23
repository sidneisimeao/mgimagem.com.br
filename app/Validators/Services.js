'use strict'

class Services {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: 'required|min:5|max:99',
      icon: 'min:5|max:20',
      description: 'required|min:5|max:500'
    }
  }

  get messages() {
    return {
      'name.required': 'Nome do nome é obrigatório.',
      'name.min': 'O nome deve ter no mínimo 5 caracteres.',
      'name.max': 'O nome deve ter no máximo 99 caracteres.',
      'icon.min': 'O nome deve ter no mínimo 5 caracteres.',
      'icon.max': 'O nome deve ter no máximo 20 caracteres.',
      'description.required': 'A descrição é obrigatória.',
      'description.min': 'O nome deve ter no mínimo 5 caracteres.',
      'description.max': 'O nome deve ter no máximo 500 caracteres.'
    }
  }
  get sanitizationRules() {
    return {
      name: 'escape'
    }
  }
}

module.exports = Services
