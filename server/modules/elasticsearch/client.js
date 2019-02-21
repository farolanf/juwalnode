const elasticsearch = require('elasticsearch')

const client = elasticsearch.Client({
  apiVersion: '6.6'
})

client.ping({
  requestTimeout: 10000
})
.then(() => console.log('elasticsearch is up'))
.catch(() => console.log('elasticsearch is down'))

module.exports = client