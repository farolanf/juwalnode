require('./passport')

module.exports = function (app, config) {
  require('./permissions')(app, config)
  require('./routes')(app, config)
}