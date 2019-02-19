'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductAttribute = sequelize.define('ProductAttribute', {
    product_attribute_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    attribute_value_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'product_attribute',
    timestamps: false,
  });
  return ProductAttribute;
};