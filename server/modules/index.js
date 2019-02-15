module.exports = function (app, config) {
  config.modules && config.modules.forEach(name => {
    const fn = require('./' + name)
    typeof fn === 'function' && fn(app, config)
  })
}