'use strict'

class UserStore {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      username: 'required|unique:users|min:5|max:100',
      email: 'required|min:5|max:100|unique:users,email',
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

module.exports = UserStore
