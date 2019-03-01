const db = require('../../sequelize')

module.exports = {
  shoppingcarts: [
    {
      model: db.Product
    }
  ]
}