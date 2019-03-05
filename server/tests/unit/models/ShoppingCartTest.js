const { ShoppingCart } = require('../../../sequelize')
const { register } = require('../../helpers/auth')
const { reset } = require('../../helpers/db')

describe('ShoppingCart model', () => {

  const attrs = [
    { name: 'Color', value: 'Red' },
    { name: 'Size', value: 'L' },
  ]

  let user

  beforeEach(async () => {
    await reset()
    user = await register().then(res => res.body.user)
  })

  it('store attributes as JSON', async () => {
    const item = await ShoppingCart.create({
      cart_id: user.Customer.cart_id,
      product_id: 1,
      attrs,
      quantity: 1,
    })
    assert.isString(item.getDataValue('attrs'))
    assert.equal(item.getDataValue('attrs'), JSON.stringify(attrs))
  })

  it('parse attributes', async () => {
    const item = await ShoppingCart.create({
      cart_id: user.Customer.cart_id,
      product_id: 1,
      attrs,
      quantity: 1,
    })
    assert.deepEqual(item.attrs, attrs)
  })
})