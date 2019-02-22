const common = require('./common')

common.modules.push('test')

common.auth.groups.customer.routes.push({ path: '/_tests', method: 'GET' })

module.exports = {
  ...common
}