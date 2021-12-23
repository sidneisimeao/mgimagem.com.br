'use strict'

class UserUpdate {
  get validateAll() {
    return true
  }

  get rules() {
    const userId = this.ctx.params.id
    return {
      username: `required|unique:users,email,id,${userId}|min:5|max:100`,
      email: `required|min:5|max:100|unique:users,email,id,${userId}`
    }
  }
  get sanitizationRules() {
    return {
      username: 'escape',
      email: 'normalize_email'
    }
  }
}

module.exports = UserUpdate
