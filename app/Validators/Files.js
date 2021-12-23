'use strict'

class Files {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      file: 'required|file|file_ext:png,jpg,jpeg|file_size:2mb'
    }
  }

  get messages() {
    return {
      'file.required': 'Imagem obrigatória.',
      'file.file': 'Imagem obrigatória.'
    }
  }
}

module.exports = Files
