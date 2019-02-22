const elasticsearch = require('elasticsearch')

const client = elasticsearch.Client({
  apiVersion: '6.6'
})

client.ping({
  requestTimeout: 5000
})

module.exports = client