require('./passport')

module.exports = function (app, config) {
  require('./permissions')(app, config)

  app.get(config.app.apiBase + '/auth/login', (req, res) => {
    res.send('hello from auth')
  })
}