'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    attrs: { type: DataTypes.STRING(1000), allowNull: false, field: 'attributes' },
    product_name: { type: DataTypes.STRING(100), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unit_cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
  }, {
    tableName: 'order_detail',
    timestamps: false,
  });
  OrderDetail.associate = function(models) {
    OrderDetail.belongsTo(models.Order, { foreignKey: 'order_id' })
    OrderDetail.belongsTo(models.Product, { foreignKey: 'product_id' })
  };
  return OrderDetail;
};