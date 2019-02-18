module.exports = function (app, config) {
  require('./passport')(app, config)
  require('./auth')(app, config)
  require('./permissions')(app, config)
}