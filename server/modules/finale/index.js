const finale = require('finale-rest')
const pluralize = require('pluralize')
const db = require('../../sequelize')
const { addIncludes } = require('../../lib/db')
const initAuth = require('./auth')

module.exports = function (app, config) {
  finale.initialize({
    app,
    sequelize: db.sequelize,
    base: config.app.apiBase
  })
  const resources = {}
  Object
    .keys(db)
    .filter(key => key.toLowerCase() !== 'sequelize')
    .forEach(name => {
      const model = db[name]
      const plural = pluralize(name).toLowerCase()
      const pk = model.primaryKeyAttributes[0]
      const resource = finale.resource({
        model,
        endpoints: [`/${plural}`, `/${plural}/:${pk}`]
      })
      resources[plural] = resource
      initMilestones(resource)
    })
  initAuth(resources)
}

function initMilestones (resource) {
  // create include query
  resource.list.fetch.before(async (req, res, context) => {
    await Promise.all(
      Object.keys(req.query).map(async q => {
        const paths = q.split('__')
        if (paths.length > 1) {
          await addIncludes(paths, req.query[q], context, db)
        }
      })
    )
    return context.continue
  })
}