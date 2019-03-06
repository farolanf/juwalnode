const common = require('./common')

common.modules.unshift('devel')

common.auth.groups.public.routes.push({
  path: '/devel/.*',
  method: '*',
})

module.exports = {
  ...common
}