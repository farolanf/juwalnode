const { ShoppingCart, Product } = require('../sequelize')

exports.cartSummary = async (user, shipping_id) => {
  const shipping = user.Customer.ShippingRegion.Shippings.find(s => 
    s.shipping_id === shipping_id
  )

  if (!shipping) {
    throw new Error('Invalid shipping_id ' + shipping_id)
  }

  const items = await ShoppingCart.findAll({
    where: {
      cart_id: user.Customer.cart_id
    },
    include: Product,
  })

  const subTotal = items.reduce(
    (acc, item) => acc + item.Product.price * item.quantity,
    0)

  const shippingCost = shipping.shipping_cost

  const total = subTotal + shippingCost

  return {
    items,
    subTotal,
    shippingCost,
    total,
    shipping_id,
  }
}