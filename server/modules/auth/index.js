require('./passport')

module.exports = function (app, config) {
  require('./auth')(app, config)
  require('./permissions')(app, config)
}