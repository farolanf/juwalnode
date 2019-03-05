const _ = require('lodash')
const Sdk = require('@paypal/checkout-server-sdk')

const events = require('../../lib/events')
const { handleError } = require('../../lib/helpers')
const { cartSummary } = require('../../lib/cart')

const apiEnv = new Sdk.core.SandboxEnvironment(
  process.env.PAYPAL_ID,
  process.env.PAYPAL_SECRET,
)

const client = new Sdk.core.PayPalHttpClient(apiEnv)

module.exports = (app, config) => {
  // create order
  app.post(config.app.apiBase + '/paypal/orders', async (req, res) => {
    try {
      const cart = await cartSummary(req.user, req.body.shipping_id)
      const request = new Sdk.orders.OrdersCreateRequest()
      request.prefer('return=representation')
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [await getPurchaseUnit(cart)]
      })
      const order = await client.execute(request)
      await events.emit('orderCreated', { req, cart, payment: 'paypal', order })
      return res.send({ orderID: order.result.id })
    }
    catch (err) {
      handleError(err, res)
    }
  })

  // capture order
  app.post(config.app.apiBase + '/paypal/orders/:orderID', async (req, res) => {
    try {
      const request = new Sdk.orders.OrdersCaptureRequest(req.params.orderID)
      request.prefer('return=representation')
      request.requestBody({})
      const capture = await client.execute(request)
      await events.emit('checkoutCompleted', {
        req,
        payment: 'paypal', 
        capture,
      })
      return res.sendStatus(200)
    }
    catch (err) {
      handleError(err, res)
    }
  })
}

const prec2 = val => Math.round(val * 100) / 100

const createMoney = currency_code => value => ({ currency_code, value: prec2(value) })

async function getPurchaseUnit (cart) {
  const money = createMoney('USD')

  return {
    amount: {
      currency_code: 'USD',
      value: prec2(cart.total),
      breakdown: {
        item_total: money(cart.subTotal),
        shipping: money(cart.shippingCost),
        // TODO: tax_total
      }
    },
    items: cart.items.map(item => ({
      name: item.Product.name,
      unit_amount: money(item.Product.price),
      quantity: item.quantity,
      description: _.truncate(item.Product.description, { length: 120 }),
      category: 'PHYSICAL_GOODS'
    }))
  }
}