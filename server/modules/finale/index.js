const finale = require('finale-rest')
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
      finale.resource({ model })
    })
}