const short = require('short-uuid')
const events = require('../../lib/events')
const { Customer, ShoppingCart } = require('../../sequelize')

async function generateCartId () {
  let unique
  do {
    // generate unique cart_id
    const cart_id = short.generate()
    unique = await ShoppingCart.count({ where: { cart_id } }) === 0
    if (!unique) continue
    unique = await Customer.count({ where: { cart_id } }) === 0
    if (unique) return cart_id
  } 
  while (!unique)
}

module.exports = (app, config) => {
  // init customer and cart for new user
  events.on('userCreated', async user => {
    const cart_id = await generateCartId()
    const customer = await Customer.create({ cart_id })
    await user.setCustomer(customer)
  })

  // generate new cart_id
  events.on('checkoutCompleted', async ({ req }) => {
    req.user.Customer.cart_id = await generateCartId()
    await req.user.Customer.save({ fields: ['cart_id'] })
  })
}