const _ = require('lodash')
const db = require('../../sequelize')
const docs = require('./docs')
const client = require('./client')

_.each(docs, initHooks)

function initHooks (Doc) {
  Doc.model.hook('afterCreate', updateRecord)
  Doc.model.hook('afterUpdate', updateRecord)
  Doc.model.hook('afterDestroy', deleteRecord(Doc.index, Doc.type))

  _.each(Doc.hooks, (definition, name) => {
    const model = db[name]
    model.hook('afterUpdate', async instance => {
      // eslint-disable-next-line
      console.log('Reindex', Doc.type, 'by', name)
      const records = await Doc.model.findAll({
        include: definition.include(instance)
      })
      records.forEach(partialUpdate(Doc, definition))
    })
  })
}

function updateRecord (Doc) {
  return record => {
    const doc = Doc.getDoc(record)
    const pk = Doc.model.primaryKeyAttributes[0]
    return client.update({
      index: Doc.index,
      type: Doc.type,
      id: doc[pk],
      body: { doc }
    })
  }
}

function partialUpdate (Doc, association) {
  const pk = Doc.model.primaryKeyAttributes[0]
  return record => {
    client.update({
      index: Doc.index,
      type: Doc.type,
      id: record[pk],
      body: {
        doc: association.getPartialBody(record)
      }
    })
  }
}

function deleteRecord (index, type) {
  return record => {
    const model = record._modelOptions.sequelize.models[record._modelOptions.name.singular]
    const pk = model.primaryKeyAttributes[0]
    client.delete({
      index,
      type,
      id: record[pk]
    })
  }
}
