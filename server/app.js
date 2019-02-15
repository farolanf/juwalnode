const helmet = require('helmet')
const app = require('express')()
const config = require('./config')

// use helmet default protections
app.use(helmet())

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
  }
}))

require('./modules')(app, config)

module.exports = app