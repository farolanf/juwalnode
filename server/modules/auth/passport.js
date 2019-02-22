const passport = require('passport')
const LocalStrategy = require('passport-local')
const { User, UserGroup, Sequelize: { Op } } = require('../../sequelize')

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({
      where: { [Op.or]: [{ username }, { email: username }] },
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
      done('Internal error')
    })
  }
))

// eslint-disable-next-line
module.exports = (app, config) => {
  app.use(passport.initialize())
}