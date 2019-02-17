const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env.' + (process.env.NODE_ENV || 'development'))
})
const serveStatic = require('serve-static')
const cors = require('cors')
const app = require('express')()
const config = require('./config')

app.disable('x-powered-by')

app.use(cors({
  origin: process.env.FRONTEND_HOST
}))

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