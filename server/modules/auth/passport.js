const passport = require('passport')
const LocalStrategy = require('passport-local')
const { User } = require('../../sequelize')

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ where: { username }})
      .then(user => {
        if (user && user.verifyPassword(password)) {
          delete user.password
          delete user.dataValues.password
          return done(null, user.dataValues)
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