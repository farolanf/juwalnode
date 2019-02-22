const client = require('./client')
const docs = require('./docs')

require('./commands')
require('./hooks')

module.exports = (app, config) => {
  app.get(config.app.apiBase + '/search/:type', (req, res) => {
    const Doc = docs[req.params.type]
    client.search({
      index: Doc.index,
      type: Doc.type,
      body: Doc.buildQuery(req.query)
    }).then(results => {
      res.send(results)
    })
  })
}