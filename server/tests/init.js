const db = require('../sequelize')

global.chai = require('chai')
global.assert = global.chai.assert

after(() => {
  db.sequelize.close()
})