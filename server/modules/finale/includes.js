const db = require('../../sequelize')

module.exports = {
  products: [
    {
      model: db.AttributeValue,
      include: [
        {
          model: db.Attribute
        }
      ]
    }
  ],
  shoppingcarts: [
    {
      model: db.Product
    }
  ],
  shippingregions: [
    {
      model: db.Shipping
    }
  ]
}