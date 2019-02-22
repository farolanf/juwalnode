const _ = require('lodash')
const db = require('../../sequelize')
const docs = require('./docs')
const client = require('./client')

_.each(docs, initHooks)

function initHooks (Doc) {
  Doc.model.hook('afterCreate', createFullRecord(Doc))
  Doc.model.hook('afterUpdate', updateFullRecord(Doc))
  Doc.model.hook('afterDestroy', deleteRecord(Doc))

  _.each(Doc.hooks, (definition, name) => {
    const model = db[name]
    model.hook('afterUpdate', async instance => {
      const records = await Doc.model.findAll({
        include: definition.include(instance)
      })
      const pk = Doc.model.primaryKeyAttributes[0]
      const ids = records.map(r => r[pk])
      const _records = await Doc.model.findAll({
        where: { [pk]: ids },
        include: Doc.associations.include
      })
      _records.forEach(updateRecord(Doc))
      // eslint-disable-next-line
      console.log('Reindex', _records.length, Doc.type, 'by', name)
    })
  })
}

function createFullRecord (Doc) {
  return record => getFullRecord(record, Doc).then(createRecord(Doc))
}

function updateFullRecord (Doc) {
  return record => getFullRecord(record, Doc).then(updateRecord(Doc))
}

function getFullRecord (record, Doc) {
  const pk = Doc.model.primaryKeyAttributes[0]
  return Doc.model.findOne({
    where: {
      [pk]: record[pk]
    },
    include: Doc.associations.include
  })
}

function createRecord (Doc) {
  return record => {
    const doc = Doc.getDoc(record)
    const pk = Doc.model.primaryKeyAttributes[0]
    return client.create({
      index: Doc.index,
      type: Doc.type,
      id: doc[pk],
      body: doc
    })
  }
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

function deleteRecord (Doc) {
  const pk = Doc.model.primaryKeyAttributes[0]
  return record => {
    client.delete({
      index: Doc.index,
      type: Doc.type,
      id: record[pk]
    })
  }
}

module.exports = {
  createRecord
}