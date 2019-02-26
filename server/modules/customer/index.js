const short = require('short-uuid')
const events = require('../../lib/events')
const { Customer, ShoppingCart } = require('../../sequelize')

module.exports = (app, config) => {
  // init customer and cart for new user
  events.on('userCreated', async user => {
    let unique, customer
    do {
      // generate unique cart_id
      const cart_id = short.generate()
      unique = await ShoppingCart.count({ where: { cart_id } }) === 0
      if (unique) {
        customer = await Customer.create({ cart_id })
      }
    } while (!unique)
    await user.setCustomer(customer)
  })
}