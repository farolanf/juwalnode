module.exports = (app, config) => {
  app.use(config.app.apiBase + '/_tests', (req, res) => res.sendStatus(200))
}