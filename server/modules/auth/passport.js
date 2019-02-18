const passport = require('passport')
const LocalStrategy = require('passport-local')
const { User, Group } = require('../../sequelize')
const { publicUser } = require('../../lib/user')

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({
      where: { username },
      include: [Group]
    })
    .then(user => {
      if (user && user.verifyPassword(password)) {
        return done(null, publicUser(user))
      }
      done(null, false)
    })
    .catch(err => {
      // eslint-disable-next-line
      console.log(err)
      done('Internal error')
    })
  }
))

// eslint-disable-next-line
module.exports = (app, config) => {
  app.use(passport.initialize())
}