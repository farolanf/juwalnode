const _ = require('lodash')
const client = require('./client')

require('./commands')

module.exports = (app, config) => {
  app.get(config.app.apiBase + '/search/:type', (req, res) => {
    if (req.query.count) {
      req.query.count = +req.query.count
    }
    if (req.query.attributes) {
      req.query.attributes = JSON.parse(req.query.attributes)
    }
    const search = {
      size: Math.min(
        !isNaN(req.query.count) ? req.query.count : 15,
        config.elasticsearch.maxCount
      ),
      query: {
        bool: {
          must: searchQuery(req.query.q),
          filter: {
            bool: { should: filterQuery(req.query) }
          }
        }
      },
      aggs: {
        all: {
          global: {},
          aggs: {
            search: {
              filter: {
                bool: {
                  must: searchQuery(req.query.q),
                }
              },
              aggs: aggs()
            }
          }
        }
      }
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

function searchQuery (q) {
  return {
    query_string: {
      query: q || '*'
    }
  }
}

function filterQuery (query) {
  return [].concat(
    (query.departments && [departmentsQuery(query.departments)] || []),
    (query.categories && [categoriesQuery(query.categories)] || []),
    (query.attributes && [attributesQuery(query.attributes)] || [])
  )
}

function departmentsQuery (departments) {
  return {
    nested: {
      path: 'departments',
      query: {
        terms: { 'departments.name': _.castArray(departments) }
      }
    }
  }
}

function categoriesQuery (categories) {
  return {
    nested: {
      path: 'categories',
      query: {
        terms: { 'categories.name': _.castArray(categories) }
      }
    }
  }
}

function attributesQuery (attributes) {
  return attributes.map(attr => ({
    nested: {
      path: 'attributes',
      query: {
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
      }
    }
  }))
}

function aggs () {
  return {
    departments: {
      nested: { path: 'departments' },
      aggs: {
        name: {
          terms: { field: 'departments.name' }
        }
      }
    },
    categories: {
      nested: { path: 'categories' },
      aggs: {
        name: {
          terms: { field: 'categories.name' }
        }
      }
    },
    attributes: {
      nested: { path: 'attributes' },
      aggs: {
        name: {
          terms: { field: 'attributes.name' },
          aggs: {
            value: {
              terms: { field: 'attributes.value' }
            }
          }
        }
      }
    }
  }
}