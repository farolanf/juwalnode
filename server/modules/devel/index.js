module.exports = function (app, config) {
  app.use((req, res, next) => {
    let output = `${req.method.padEnd(7)} ${req.path}`
    next()
    const color = res.statusCode < 400
      ? '\x1b[32m'
      : '\x1b[31m'
    output += ` ${res.statusCode}`
    console.log(color + output + '\x1b[0m')
  })
}