global.chai = require('chai')
global.assert = global.chai.assert

global.chai.use(require('chai-http'))
global.request = global.chai.request
