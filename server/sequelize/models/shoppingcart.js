'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cart_id: { type: DataTypes.CHAR(32), allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    attrs: { type: DataTypes.STRING(1000), allowNull: false, field: 'attributes' },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    buy_now: { type: DataTypes.TINYINT(1), allowNull: false },
    added_on: { type: DataTypes.DATE, allowNull: false }
  }, {
    tableName: 'shopping_cart',
    timestamps: false,
  });
  ShoppingCart.associate = function(models) {
    ShoppingCart.belongsTo(models.Product, { foreignKey: 'product_id' })
  };
  return ShoppingCart;
};