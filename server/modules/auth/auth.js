const jwt = require('jsonwebtoken')
const passport = require('passport')
const { User } = require('../../sequelize')

// TODO: implement jwtId. It invalidates existing token on change as user
// with the old jwtId will not be found.

function tokenFromRequest (req) {
  return (req.get('Authorization') || '').replace(/^Bearer /, '')
}

function generateToken (user, secret) {
  return jwt.sign({ userId: user.user_id, jwtId: user.jwtId }, secret)
}

function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret)
  } catch (err) {
    // ignore
  }
}

module.exports = function (app, config) {
  // decode token and set req.user
  app.use((req, res, next) => {
    const token = tokenFromRequest(req)
    if (token) {
      const payload = verifyToken(token, config.auth.jwtSecret)
      if (!payload) {
        return res.sendStatus(500)
      }
      User.findOne({ where: { user_id: payload.userId }})
        .then(user => {
          req.user = user.dataValues
          next()
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err)
          res.sendStatus(500)
        })
    } else {
      next()
    }
  })

  app.post(config.app.apiBase + '/auth/register', (req, res) => {
    res.send('hello from auth')
  })

  app.get(config.app.apiBase + '/auth/verify', (req, res) => {
    const token = tokenFromRequest(req)
    const payload = verifyToken(token, config.auth.jwtSecret)
    if (!payload) {
      return res.sendStatus(401)
    }
    User.findOne({ where: { user_id: payload.userId }})
      .then(user => {
        res.send({ user })
      })
      .catch(err => {
        // eslint-disable-next-line
        console.log(err)
        res.sendStatus(500)
      })
  })

  app.post(
    config.app.apiBase + '/auth/local',
    passport.authenticate('local', { session: false }),
    (req, res) => {
      res.send({
        token: generateToken(req.user, config.auth.jwtSecret),
        user: req.user
      })
    })
}