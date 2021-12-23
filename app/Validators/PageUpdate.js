'use strict'

class PageUpdate {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: 'required|min:5|max:99',
      description: 'required|min:5|max:65000'
    }
  }

  get messages() {
    return {
      'name.required': 'Nome da página é obrigatório.',
      'description.required': 'Conteúdo obrigatório.'
    }
  }
  get sanitizationRules() {
    return {
      name: 'escape'
    }
  }
}

module.exports = PageUpdate
