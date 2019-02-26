const _ = require('lodash')
const app = require('../../app')
const { app: { apiBase } } = require('../../config')
const { register } = require('../helpers/auth')
const { reset } = require('../helpers/db')
const { ShoppingCart } = require('../../sequelize')

describe('shoppingcarts API', () => {

  let authorization

  const item = {
    product_id: 1,
    attrs: [
      { name: 'Color', value: 'Green' },
      { name: 'Size', value: 'XL' }
    ],
    quantity: 3
  }

  const item2 = {
    product_id: 2,
    attrs: [
      { name: 'Color', value: 'Red' },
      { name: 'Size', value: 'M' }
    ],
    quantity: 1
  }

  function create (data) {
    return request(app)
      .post(apiBase + '/shoppingcarts')
      .set('Authorization', authorization)
      .send(data)
  }

  beforeEach(async () => {
    await reset()
    await register().then(res => {
      authorization = 'Bearer ' + res.body.token
    })
  })

  it('list items in current cart', async () => {
    await create(item)
    await create(item2)
    await request(app)
      .get(apiBase + '/shoppingcarts')
      .set('Authorization', authorization)
      .then(res => {
        assert.equal(res.status, 200)
        assert.isArray(res.body)
        assert.deepEqual(
          _.pick(res.body[0], ['product_id', 'attrs', 'quantity']),
          item)
        assert.deepEqual(
          _.pick(res.body[1], ['product_id', 'attrs', 'quantity']),
          item2)
      })
  })

  it('create item in current cart', async () => {
    await request(app)
      .post(apiBase + '/shoppingcarts')
      .set('Authorization', authorization)
      .send(item)
      .then(res => {
        assert.equal(res.status, 201)
      })
  })

  it('fetch one item', async () => {
    const { body: newItem } = await create(item)
    await request(app)
      .get(apiBase + '/shoppingcarts/' + newItem.item_id)
      .set('Authorization', authorization)
      .then(res => {
        assert.equal(res.status, 200)
        assert.deepEqual(
          _.pick(res.body, ['product_id', 'attrs', 'quantity']),
          _.pick(item, ['product_id', 'attrs', 'quantity'])
        )
      })
  })

  it('update item', async () => {
    const { body: newItem } = await create(item)
    await request(app)
      .put(apiBase + '/shoppingcarts/' + newItem.item_id)
      .send(item2)
      .set('Authorization', authorization)
      .then(res => {
        assert.equal(res.status, 200)
        assert.deepEqual(
          _.pick(res.body, ['product_id', 'attrs', 'quantity']),
          item2)
      })
  })

  it('delete item', async () => {
    const { body: newItem1 } = await create(item)
    const { body: newItem2 } = await create(item2)
    await request(app)
      .delete(apiBase + '/shoppingcarts/' + newItem2.item_id)
      .set('Authorization', authorization)
      .then(async res => {
        assert.equal(res.status, 200)
        assert.equal(await ShoppingCart.count({
          where: { item_id: newItem2.item_id }
        }), 0)
        assert.equal(await ShoppingCart.count({
          where: { item_id: newItem1.item_id }
        }), 1)
      })
  })
})