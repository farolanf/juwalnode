const passport = require('passport')
const uuid = require('uuid')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oauth20')

const { User, UserGroup, Sequelize: { Op } } = require('../../sequelize')

async function handleProfile (accessToken, refreshToken, profile, done) {
  try {
    const { provider } = profile
    const count = await User.count()
    const username = profile.emails[0].value.split('@')[0] + (count + 1)
    const email = profile.emails[0].value
    User.findOrCreate({
      where: {
        [Op.or]: [
          { [provider + '_id']: profile.id },
          { email }
        ]
      },
      defaults: {
        email,
        username,
        password: uuid(),
        [provider + '_id']: profile.id,
      },
      include: UserGroup
    })
    .then(async ([user, created]) => {
      if (!created) {
        user[provider + '_id'] = profile.id
        user = await user.save()
      }
      user ? done(null, user) : done(null, false)
    })
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err)
    done(500, false)
  }
}


passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['email'],
  },
  handleProfile
))

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  handleProfile
))

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({
    where: {
      [Op.or]: [
        { email: username },
        { username },
      ]
    },
    include: UserGroup
  })
  .then(user => {
    if (user && user.verifyPassword(password)) {
      return done(null, user)
    }
    done(null, false)
  })
  .catch(err => {
    // eslint-disable-next-line
    console.log(err)
    done(500, false)
  })
}))

// eslint-disable-next-line
module.exports = (app, config) => {
  app.use(passport.initialize())
}