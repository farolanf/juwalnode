
// check each group for permission on the given path and method
function checkRoutePermission (path, method, groups, options) {
  if (options.publicMethods.includes(method)) return true
  return groups.find(name => {
    if (name === 'admin') return true
    const group = options.groups[name]
    const routes = group.routes || []
    return routes.find(route => {
      route = typeof route === 'string' ? { path: route, method: 'GET' } : route
      const re = route.path instanceof RegExp ? route.path : new RegExp(route.path)
      const methods = Array.isArray(route.method) ? route.method : [route.method]
      if (methods.includes(method) && re.test(path)) return true
    })
  })
}

module.exports = function (app, config) {
  app.use((req, res, next) => {
    const groups = (req.user && req.user.groups) || ['public']
    if (checkRoutePermission(req.path, req.method, groups, config.auth)) {
      return next()
    }
    res.sendStatus(403)
  })
}