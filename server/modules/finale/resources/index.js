module.exports = resources => {
  require('./shoppingcarts')(resources.shoppingcarts)
  require('./customers')(resources.customers)
}
