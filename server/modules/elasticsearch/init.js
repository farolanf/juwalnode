const _ = require('lodash')
const config = require('../../config')
const client = require('./client')
const docs = require('./docs')
const { createRecord } = require('./hooks')

const options = {
  settings: {
  },
  mappings: Object.keys(docs).reduce((mappings, type) => {
    mappings[type] = docs[type].mappings
    return mappings
  }, {})
}

module.exports = async function initIndices () {
  await client.indices.create({
    index: config.elasticsearch.index,
    body: options
  })

  return Promise.all(_.map(docs, rebuildIndex))
}

async function rebuildIndex (Doc) {
  // FIXME: split in batches
  const records = await Doc.model.findAll({
    include: Doc.associations.include
  })
  await Promise.all(records.map(createRecord(Doc)))
}