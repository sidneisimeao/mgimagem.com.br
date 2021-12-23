'use strict'

class ResetPassword {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      token: 'required',
      password: 'required|min:6|max:30|confirmed'
    }
  }
  get sanitizationRules() {
    return {
      username: 'escape',
      email: 'normalize_email',
      password: 'escape'
    }
  }
}

module.exports = ResetPassword
