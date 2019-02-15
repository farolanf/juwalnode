module.exports = function (app, config) {
  app.get(config.apiBase + '/auth', (req, res) => {
    res.send('hello from auth')
  })
}