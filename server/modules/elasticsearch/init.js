const _ = require('lodash')
const config = require('../../config')
const client = require('./client')
const db = require('../../sequelize')

const options = {
  settings: {
  },
  mappings: {
    products: {
      properties: {
        name: { type: 'text' },
        description: { type: 'text' },
        price: { type: 'float' },
        discounted_price: { type: 'float' },
        display: { type: 'integer' },
        departments: {
          type: 'nested',
          properties: {
            name: { type: 'keyword' }
          }
        },
        categories: {
          type: 'nested',
          properties: {
            name: { type: 'keyword' }
          }
        },
        attributes: {
          type: 'nested',
          properties: {
            name: { type: 'keyword' },
            value: { type: 'keyword' },
          }
        }
      }
    },
  }
}

module.exports = async function initIndices () {
  await client.indices.create({
    index: config.elasticsearch.index,
    body: options
  })

  // reindex
  const records = await db.Product.findAll({
    include: [
      {
        model: db.Category,
        include: db.Department,
      },
      {
        model: db.AttributeValue,
        include: db.Attribute
      }
    ]
  })

  await Promise.all(
    records.map(record => {
      const doc = _.pick(record.dataValues, [
        'product_id',
        'name',
        'description',
        'price',
        'discounted_price',
        'display'
      ])
      doc.departments = (record.Categories || []).map(c => ({
        name: c.Department.name
      }))
      doc.categories = (record.Categories || []).map(c => ({
        name: c.name
      }))
      doc.attributes = (record.AttributeValues || []).map(av => ({
        name: av.Attribute.name,
        value: av.value
      }))
      return client.create({
        index: config.elasticsearch.index,
        type: 'products',
        id: doc.product_id,
        body: doc
      })
    })
  )
}