'use strict'

module.exports = saveLocal => {
  return saveLocal.get('token').then(token => {
    if (!token) {
      return false
    }

    return token
  })
}
