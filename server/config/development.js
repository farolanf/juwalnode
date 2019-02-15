const common = require('./common')
const _ = require('lodash')

module.exports = _.merge({}, common, {
  data: {
    mysql: {
      dbName: 'turing_fullstack',
      user: 'turing',
      password: 'turing',
      //host: 'localhost',
      //port: 3306
    }
  }
})