module.exports = (app, config) => {
  require('./apollo')(app, config)
}

module.exports.models = require('./models')
module.exports.mongoose = require('mongoose')