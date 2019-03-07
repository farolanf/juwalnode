const _ = require('lodash')
const { schemaComposer } = require('graphql-compose')
const { composeWithMongoose } = require('graphql-compose-mongoose')
const models = require('./models')

Object.keys(models).forEach(name => {
  const model = models[name]
  const tc = composeWithMongoose(model)
  const resolvers = ['findById', 'findByIds', 'findOne', 'findMany', 'count', 'connection', 'pagination']
  const fields = {}
  
  resolvers.forEach(resolver => {
    const suffix = _.upperFirst(resolver.replace('find', ''))
    fields[_.lowerFirst(name) + suffix] = tc.getResolver(resolver)
  })

  schemaComposer.Query.addFields(fields)
})

module.exports = schemaComposer.buildSchema()