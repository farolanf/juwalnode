'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShippingRegion = sequelize.define('ShippingRegion', {
    shipping_region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shipping_region: { type: DataTypes.STRING(100), allowNull: false }
  }, {
    tableName: 'shipping_region',
    timestamps: false,
  });
  ShippingRegion.associate = function (models) {
    ShippingRegion.hasMany(models.Shipping, { foreignKey: 'shipping_region_id' })
  }
  return ShippingRegion;
};