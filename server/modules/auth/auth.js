const jwt = require('jsonwebtoken')
const passport = require('passport')
const yup = require('yup')

const { User, UserGroup } = require('../../sequelize')
const { publicUser, internalUser, userInclude } = require('../../lib/user')
const { handleError } = require('../../lib/helpers')

const events = require('../../lib/events')

// TODO: implement jwtId. It invalidates existing token on change as user
// with the old jwtId will not be found.

const registerSchema = yup.object().shape({
  email: yup.string().email().max(100).required(),
  password: yup.string().min(8).max(100).required(),
})

function tokenFromRequest (req) {
  return (req.get('Authorization') || '').replace(/^Bearer /, '')
}

function generateToken (user, secret) {
  return jwt.sign({ userId: user.user_id, jwtId: user.jwtId }, secret)
}

function verifyToken (token, secret) {
  try {
    return jwt.verify(token, secret)
  } catch (err) {
    // ignore
  }
}

module.exports = function (app, config) {
  // decode token and set req.user
  app.use((req, res, next) => {
    try {
      const token = tokenFromRequest(req)
      if (token) {
        const payload = verifyToken(token, config.auth.jwtSecret)
        if (!payload) {
          return res.sendStatus(401)
        }
        User.findOne({
          where: { user_id: payload.userId },
          include: userInclude()
        })
        .then(user => {
          if (user) {
            req.user = internalUser(user)
          } else {
            return res.sendStatus(401)
          }
          next()
        })
      } else {
        next()
      }
    }
    catch (err) {
      handleError(err, res)
    }
  })

  app.post(config.app.apiBase + '/auth/register', async (req, res) => {
    try {
      if (!await registerSchema.isValid(req.body)) {
        return res.sendStatus(400)
      }
      const { email, password } = req.body
      const count = await User.count()
      const username = 'user' + (count + 1)
      const user = await User.create({ username, email, password })
      await events.emit('userCreated', user)
      await UserGroup.bulkCreate(config.auth.defaultGroups.map(group => ({
        user_id: user.user_id,
        group
      })))
      const _user = await User.findOne({
        where: { user_id: user.user_id },
        include: userInclude()
      })
      sendUser(_user, res)
    }
    catch (err) {
      handleError(err, res)
    }
  })

  app.get(config.app.apiBase + '/auth/verify', (req, res) => {
    try {
      const token = tokenFromRequest(req)
      const payload = verifyToken(token, config.auth.jwtSecret)
      if (!payload) {
        return res.sendStatus(401)
      }
      User.findOne({
        where: { user_id: payload.userId },
        include: userInclude()
      })
      .then(user => {
        user ? sendUser(user, res) : res.sendStatus(401)
      })
    }
    catch (err) {
      handleError(err, res)
    }
  })

  app.get(config.app.apiBase + '/auth/unique-email', async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.query.email
        }
      })
      res.send({ unique: !user })
    }
    catch (err) {
      handleError(err, res)
    }
  })

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email'],
  }))

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
    const token = generateToken(req.user, config.auth.jwtSecret)
    res.redirect(process.env.FRONTEND_AUTH_REDIRECT + `?token=${token}`)
  })

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }))

  app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    const token = generateToken(req.user, config.auth.jwtSecret)
    res.redirect(process.env.FRONTEND_AUTH_REDIRECT + `?token=${token}`)
  })

  app.post(
    config.app.apiBase + '/auth/local',
    passport.authenticate('local', { session: false }),
    (req, res) => {
      sendUser(req.user, res)
    })

  function sendUser (user, res) {
    res.send({
      token: generateToken(user, config.auth.jwtSecret),
      user: publicUser(user)
    })
  }
}