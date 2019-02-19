const finale = require('finale-rest')
const pluralize = require('pluralize')
const db = require('../../sequelize')

module.exports = function (app, config) {
  finale.initialize({
    app,
    sequelize: db.sequelize,
    base: config.app.apiBase
  })
  Object
    .keys(db)
    .filter(key => key.toLowerCase() !== 'sequelize')
    .forEach(name => {
      const model = db[name]
      const plural = pluralize(name).toLowerCase()
      const pk = model.primaryKeyAttributes[0]
      finale.resource({
        model,
        endpoints: [`/${plural}`, `/${plural}/:${pk}`]
      })
    })
}