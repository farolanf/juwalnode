require('./passport')

module.exports = function (app, config) {
  app.get(config.app.apiBase + '/auth', (req, res) => {
    res.send('hello from auth')
  })
}