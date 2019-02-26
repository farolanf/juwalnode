const app = require('../../app')
const { app: { apiBase } } = require('../../config')

const _email = 'user@foo.com'
const _password = 'hellopw123'

exports.register = function register (email = _email, password = _password) {
  return request(app)
    .post(apiBase + '/auth/register')
    .send({ email, password })
}
