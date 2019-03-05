const events = require('../../lib/events')
const { Order, OrderDetail, Customer, ShoppingCart } = require('../../sequelize')

module.exports = (app, config) => {
  // create order record
  events.on('orderCreated', async ({ req, payment, cart, order }) => {
    let reference

    if (payment == 'paypal') {
      reference = order.result.id
    }
    reference = `${payment}:${reference}`

    const _order = await Order.create({
      total_amount: cart.total,
      customer_id: req.user.Customer.customer_id,
      reference,
      shipping_id: cart.shipping_id,
    })

    await Promise.all(cart.items.map(item => {
      return OrderDetail.create({
        item_id: item.item_id,
        order_id: _order.order_id,
        product_id: item.product_id,
        attrs: item.attrs,
        product_name: item.Product.name,
        quantity: item.quantity,
        unit_cost: item.Product.price,
      })
    }))
  })
}