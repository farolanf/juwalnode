const path = require('path')
const helmet = require('helmet')
const serveStatic = require('serve-static')
const app = require('express')()
const config = require('./config')

// use helmet default protections
app.use(helmet())

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
  }
}))

app.use(serveStatic(path.resolve(__dirname, '../challenge-files/Images/images'), {
  index: false,
  maxAge: '1d'
}))

app.use(serveStatic(path.resolve(__dirname, '../challenge-files/Images/product_images'), {
  index: false,
  fallthrough: false,
  maxAge: '1d'
}))

require('./modules')(app, config)

module.exports = app