const common = require('./common')

module.exports = {
  ...common,
  mysql: {
    dbname: 'turing_fullstack',
    user: 'turing',
    password: 'turing',
    //host: 'localhost',
    //port: 3306
  }
}