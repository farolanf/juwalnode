const common = require('./common')

module.exports = {
  ...common,
  mysql: {
    dbName: 'turing_fullstack',
    user: 'turing',
    password: 'turing',
    //host: 'localhost',
    //port: 3306
  }
}