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
    image: DataTypes.STRING(150),
    image_2: DataTypes.STRING(150),
    thumbnail: DataTypes.STRING(150),
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
      foreignKey: 'product_id'
    })
  };
  return Product;
};