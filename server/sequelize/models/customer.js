'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: DataTypes.STRING(50), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false },
    password: { type: DataTypes.STRING(50), allowNull: false },
    credit_card: DataTypes.TEXT,
    address_1: DataTypes.STRING,
    address_2: DataTypes.STRING,
    city: DataTypes.STRING,
    region: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    country: DataTypes.STRING,
    shipping_region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    day_phone: DataTypes.STRING,
    eve_phone: DataTypes.STRING,
    mob_phone: DataTypes.STRING,
    cart_id: { type: DataTypes.STRING(32), allowNull: false, unique: true }
  }, {
    tableName: 'customer',
    timestamps: false,
  });
  Customer.associate = function(models) {
    Customer.belongsTo(models.ShippingRegion, { foreignKey: 'shipping_region_id' })
  };
  return Customer;
};