'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductAttribute = sequelize.define('ProductAttribute', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    attribute_value_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'product_attribute'
  });
  return ProductAttribute;
};