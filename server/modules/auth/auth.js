const jwt = require('jsonwebtoken')
const db = require('../../sequelize')

function generateToken (user, secret) {
  return jwt.sign({ userId: user._id, jwtId: user.jwtId }, secret)
}

function verifyToken(token, secret) {
  return jwt.verify(token, secret)
}

module.exports = function (app, config) {
  // decode token and set req.user
  app.use((req, res, next) => {
    const token = (req.get('Authorization') || '').replace(/^Bearer /, '')
    if (token) {
      verifyToken(token, config.auth.jwtSecret, (err, payload) => {
        if (err) {
          return res.sendStatus(500)
        }
        // TODO: load user
      })
    } else {
      next()
    }
  })
  app.post(config.app.apiBase + '/auth/register', (req, res) => {
    res.send('hello from auth')
  })
}