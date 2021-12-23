'use strict'

class PostSave {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: 'required|min:5|max:99',
      description: 'required|min:5|max:65000',
      tags: 'max:65000',
      seo: 'max:500',
      author: 'max:100',
      created_at: 'required'
    }
  }

  get messages() {
    return {
      'name.required': 'Nome da página é obrigatório.',
      'description.required': 'Conteúdo obrigatório.',
      'created_at.required':
        'Obrigatório agendar a data da postagem. Formato: dd-mm-yyyy. Ex: 20-01-2021'
    }
  }
  get sanitizationRules() {
    return {
      name: 'escape',
      seo: 'escape'
    }
  }
}

module.exports = PostSave
