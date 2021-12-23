'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const File = use('App/Models/File')
const Helpers = use('Helpers')
const Database = use('Database')
const sharp = require('sharp')
const fs = require('fs')
/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   *
   * @param {*} param0
   */
  async show({ params, response }) {
    try {
      const file = await File.findOrFail(params.id)

      return response.download(Helpers.tmpPath(`uploads/${file.file}`))
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Arquivo não encontrado!' } })
    }
  }

  /**
   * Render a form to be used for creating a new file.
   * GET files/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, view }) {
    const post = await Database.select(
      'posts.id',
      'posts.name',
      'files.id as file_id',
      'files.type as file_type'
    )
      .from('posts')
      .leftJoin('files', 'posts.id', 'files.post_id')
      .where('posts.id', params.id)
      .first()

    return view.render('dashboard.posts.image', { ...post })
  }

  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response, params, session }) {
    // Inicia uma transação no banco
    const trx = await Database.beginTransaction()

    try {
      // Obtem a imagem enviada
      const upload = request.file('file')
      // Novo nome para imagem
      const fileName = `${Date.now()}.${upload.subtype}`
      // Novo nome para imagem otimizada
      const optmizedFileName = `${Date.now()}.jpg`

      // Tenta mover para pasta do projeto: /tmp/uploads
      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      // Faz o upload ou
      if (!upload.moved()) {
        // Lança uma exceção com o erro
        throw upload.error()
      }

      // Se houver imagem antiga
      if (request.input('file_id')) {
        // Busca no banco
        const file = await File.find(request.input('file_id'))
        if (file) {
          // Remove a imagem antiga
          fs.unlinkSync(Helpers.tmpPath('uploads') + '/' + file.file)
          // Remove o registro
          await file.delete()
        }
      }

      // Faz o redimencionamento e optmização
      sharp(Helpers.tmpPath('uploads') + '/' + fileName)
        .resize(900)
        .toFormat('jpg', { progressive: true, quality: 70 })
        .toFile(`${Helpers.tmpPath('uploads')}/${optmizedFileName}`, function (
          err
        ) {
          // Se houver erros
          if (err) {
            throw new Error(err.message)
          }
          // Remove a imagem antiga
          fs.unlinkSync(Helpers.tmpPath('uploads') + '/' + fileName)
        })

      // Atualiza os dados no banco
      await File.create({
        file: optmizedFileName,
        name: upload.clientName,
        type: upload.type,
        subtype: 'jpg',
        post_id: params.id
      })

      // Cria mensagem
      session.flash({
        success: true,
        message: 'Imagem criado com sucesso!'
      })
    } catch (err) {
      // Caso houver uma transação em andamento desfaz
      if (trx) {
        // Faz rolback
        await trx.rollback()
      }
      return response.redirect('back')
    }

    // Commit
    await trx.commit()

    // Retona a rota
    return response.route('posts.index')
  }
}

module.exports = FileController
