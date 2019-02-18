'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(1000), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    discounted_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    image: { type: DataTypes.STRING(150), allowNull: false },
    image_2: { type: DataTypes.STRING(150), allowNull: false },
    thumbnail: { type: DataTypes.STRING(150), allowNull: false },
    display: DataTypes.SMALLINT(6)
  }, {
    tableName: 'product',
    timestamps: false,
  });
  Product.associate = function(models) {
    Product.belongsToMany(models.Category, {
      through: 'ProductCategory',
      foreignKey: 'product_id'
    })
    Product.belongsToMany(models.AttributeValue, {
      through: 'ProductAttribute',
      foreignKey: 'attribute_value_id'
    })
  };
  return Product;
};