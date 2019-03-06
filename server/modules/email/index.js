const events = require('../../lib/events')
const { sendMail } = require('../../lib/mail')
const { Order, OrderDetail, Shipping } = require('../../sequelize')
const { createFormatCurrency } = require('../../lib/format')
const config = require('../../config')

// send order confirmation email
events.on('checkoutCompleted', async ({ req, payment, capture }) => {
  const currency = createFormatCurrency('USD')
  const order = await Order.findOne({
    where: { reference: `${payment}:${capture.result.id}`},
    include: [OrderDetail, Shipping],
  })
  const context = {
    orderId: order.order_id,
    shippingCost: order.Shipping.shipping_cost,
    items: order.OrderDetails.map((item, i) => {
      item.index = i + 1
      return item
    }),
    price () {
      return currency(this.unit_cost)
    },  
    amount () {
      return currency(this.unit_cost * this.quantity)
    },
    _subTotal () {
      return this.items.reduce((acc, item) => {
        return acc + (item.unit_cost * item.quantity)
      }, 0)
    },
    subTotal () {
      return currency(this._subTotal())
    },
    shipping () {
      return currency(this.shippingCost)
    },
    total () {
      return currency(this._subTotal() + this.shippingCost)
    }
  }
  await sendMail({
    to: req.user.email,
    from: config.email,
    subject: 'Order confirmation #' + order.order_id,
  }, 'order-confirmation', context)
})