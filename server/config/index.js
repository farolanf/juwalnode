const name = process.env.NODE_ENV || 'development'

module.exports = require(`./${name}.js`)