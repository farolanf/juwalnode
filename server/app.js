const path = require('path')
const serveStatic = require('serve-static')
const app = require('express')()
const config = require('./config')

app.use('/img',
  serveStatic(path.resolve(__dirname, '../challenge-files/Images/images'), {
    index: false,
    maxAge: '1d'
  }),
  serveStatic(path.resolve(__dirname, '../challenge-files/Images/product_images'), {
    index: false,
    fallthrough: false,
    maxAge: '1d'
  })
)

require('./modules')(app, config)

module.exports = app