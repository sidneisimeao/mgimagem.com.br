'use strict'

class AgreementSave {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: 'required|min:2|max:99',
      link: 'min:2|max:248'
    }
  }

  get messages() {
    return {
      'name.required': 'Nome do convênio é obrigatório.'
    }
  }
  get sanitizationRules() {
    return {
      name: 'escape'
    }
  }
}

module.exports = AgreementSave
