const { handleError } = require('../../../lib/helpers')
const schemas = require('../schemas')

module.exports = function secureShoppingCarts (resource) {
  // list
  resource.list.fetch.before(async (req, res, context) => {
    try {
      if (!req.user.admin) {
        // only allow listing current shopping cart items
        context.criteria = {
          cart_id: req.user.Customer.cart_id
        }
      }
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })

  resource.list.send.before(async (req, res, context) => {
    try {
      context.instance = context.instance.map(r => {
        r.attrs = JSON.parse(r.attrs)
        return r
      })
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })

  // create
  // params:
  //   product_id
  //   attributes: [{ name, value }, ...]
  //   quantity
  resource.create.write.before(async (req, res, context) => {
    try {
      if (!req.user.admin) {
        const params = schemas.create.cast(req.body)

        if (!params || !await schemas.create.isValid(params)) {
          return res.sendStatus(400)
        }

        // create item in the current shopping cart
        context.attributes = {
          cart_id: req.user.Customer.cart_id,
          product_id: params.product_id,
          attrs: JSON.stringify(params.attrs),
          quantity: params.quantity,
        }
      }
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })

  // read
  resource.read.fetch.before(async (req, res, context) => {
    try {
      if (!req.user.admin) {
        context.criteria = {
          item_id: req.params.item_id,
          cart_id: req.user.Customer.cart_id
        }
      }
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })

  resource.read.send.before(async (req, res, context) => {
    try {
      context.instance.attrs = JSON.parse(context.instance.attrs)
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })

  // update

  resource.update.fetch.before(async (req, res, context) => {
    try {
      if (!req.user.admin) {
        context.criteria = {
          item_id: req.params.item_id,
          cart_id: req.user.Customer.cart_id
        }
      }
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })

  resource.update.write.before(async (req, res, context) => {
    try {
      if (!req.user.admin) {
        const params = schemas.create.cast(req.body)

        if (!params || !await schemas.create.isValid(params)) {
          return res.sendStatus(400)
        }

        context.attributes = {
          product_id: params.product_id,
          attrs: JSON.stringify(params.attrs),
          quantity: params.quantity,
        }
      }
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })

  resource.update.send.before(async (req, res, context) => {
    try {
      context.instance.attrs = JSON.parse(context.instance.attrs)
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })

  // delete
  resource.delete.fetch.before(async (req, res, context) => {
    try {
      if (!req.user.admin) {
        context.criteria = {
          item_id: req.params.item_id,
          cart_id: req.user.Customer.cart_id
        }
      }
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })
}