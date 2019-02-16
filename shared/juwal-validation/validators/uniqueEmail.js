const axios = require('axios')
const _ = require('lodash')

function uniqueEmail(email, options, resolve, reject) {
  axios.post(options.url, { email })
    .then(res => {
      res.data.ok ? resolve() : resolve('is taken')
    })
    .catch(error => {
      reject(new Error(error.message))
    })
}

const uniqueEmailDebounced = _.debounce(uniqueEmail, 350)

module.exports = function(email, options) {
  return new Promise(function(resolve, reject) {
    if (options.url) {
      uniqueEmailDebounced(email, options, resolve, reject)
    } else if (options.app) {
      // TODO: query using ORM
      options.apos.users.safe.findOne({ email }, function(err, user) {
        if (err) {
          return reject(new Error(err))
        }
        user ? resolve('is taken') : resolve()
      })
    } else {
      throw new Error('Missing url|app option')
    }
  })
}