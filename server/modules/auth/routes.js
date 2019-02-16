module.exports = function (app, config) {
  app.post(config.app.apiBase + '/auth/register', (req, res) => {
    res.send('hello from auth')
  })
}