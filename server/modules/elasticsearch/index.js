const _ = require('lodash')
const client = require('./client')

require('./commands')

module.exports = (app, config) => {
  app.get(config.app.apiBase + '/search/:type', (req, res) => {
    if (req.query.attributes) {
      req.query.attributes = JSON.parse(req.query.attributes)
    }
    const search = {
      size: Math.min(req.query.count || 15, config.elasticsearch.maxCount),
      query: {
        bool: {
          must: {
            query_string: {
              query: req.query.q || '*'
            }
          }
        }
      }
    }

    if (req.query.departments) {
      search.query.bool.filter = _.merge(
        search.query.bool.filter,
        {
          bool: {
            must: []
          }
        }
      )
      search.query.bool.filter.bool.must.push({
        nested: {
          path: 'departments',
          query: {
            terms: {
              'departments.name': _.castArray(req.query.departments)
            }
          }
        }
      })
    }

    if (req.query.categories) {
      search.query.bool.filter = _.merge(
        search.query.bool.filter,
        {
          bool: {
            must: []
          }
        }
      )
      search.query.bool.filter.bool.must.push({
        nested: {
          path: 'categories',
          query: {
            terms: {
              'categories.name': _.castArray(req.query.categories)
            }
          }
        }
      })
    }

    if (req.query.attributes) {
      search.query.bool.filter = _.merge(
        search.query.bool.filter,
        {
          bool: {
            must: []
          }
        }
      )
      search.query.bool.filter.bool.must.push({
        nested: {
          path: 'attributes',
          query: {
            bool: {
              should: req.query.attributes.map(attr => ({
                bool: {
                  must: [
                    {
                      match: { 'attributes.name': attr.name }
                    },
                    {
                      match: { 'attributes.value': attr.value }
                    }
                  ]
                }
              }))
            }
          }
        }
      })
    }

    client.search({
      index: config.elasticsearch.index,
      type: req.params.type,
      body: search
    }).then(results => {
      res.send(results)
    })
  })
}