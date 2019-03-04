const db = require('../../sequelize')

module.exports = {
  customers: [
    {
      model: db.ShippingRegion,
      include: [
        {
          model: db.Shipping
        }
      ]
    }
  ],
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
}