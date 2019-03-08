const app = require('./app')

module.exports = {
  models: app.modules.db.models,
  mongoose: app.modules.db.mongoose,
}