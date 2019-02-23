const jwt = require('jsonwebtoken')
const passport = require('passport')
const yup = require('yup')

const { User, UserGroup } = require('../../sequelize')
const { publicUser } = require('../../lib/user')

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

function handleError (res) {
  return err => {
    // eslint-disable-next-line
    console.log(err)
    res.sendStatus(500)
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
      User.findOne(
        {
          where: { user_id: payload.userId },
          include: UserGroup
        })
        .then(user => {
          req.user = publicUser(user)
          next()
        })
        .catch(handleError(res))
    } else {
      next()
    }
  })

  app.post(config.app.apiBase + '/auth/register', async (req, res) => {
    if (!await registerSchema.isValid(req.body)) {
      return res.sendStatus(400)
    }
    const { email, password } = req.body
    const count = await User.count().catch(handleError(res))
    const username = 'user' + (count + 1)
    const user = await User.create({ username, email, password })
      .catch(handleError(res))
    await UserGroup.bulkCreate(config.auth.defaultGroups.map(group => ({
      user_id: user.user_id,
      group
    })))
    const _user = await User.findOne({
      where: { user_id: user.user_id },
      include: UserGroup
    })
    sendUser(_user, res)
  })

  app.get(config.app.apiBase + '/auth/verify', (req, res) => {
    const token = tokenFromRequest(req)
    const payload = verifyToken(token, config.auth.jwtSecret)
    if (!payload) {
      return res.sendStatus(401)
    }
    User.findOne(
      {
        where: { user_id: payload.userId },
        include: UserGroup
      })
      .then(user => sendUser(user, res))
      .catch(handleError)
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

  app.get(config.app.apiBase + '/auth/unique-email', async (req, res) => {
    const user = await User.findOne({
      where: {
        email: req.query.email
      }
    }).catch(handleError)
    res.send({ unique: !user })
  })
}