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
    // sequelize error when using 'attributes' field name, so use 'attrs' instead
    attrs: { type: DataTypes.STRING(1000), allowNull: false, field: 'attributes' },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    buy_now: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: true }
  }, {
    tableName: 'shopping_cart',
    createdAt: 'added_on',
    updatedAt: false,
  });
  ShoppingCart.associate = function(models) {
    ShoppingCart.belongsTo(models.Product, { foreignKey: 'product_id' })
    ShoppingCart.hasOne(models.OrderDetail, { foreignKey: 'item_id' })
  };
  return ShoppingCart;
};