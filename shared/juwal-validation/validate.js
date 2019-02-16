const validate = require('validate.js')
const _ = require('lodash')

const options = require('./options')
require('./validators')

_.each(validate.validators, (validator, name) => {
  if (options[name]) {
    validator.options = options[name]
  }
})

module.exports = validate