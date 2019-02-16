'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    review: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.SMALLINT(6), allowNull: false },
    created_on: { type: DataTypes.DATE, allowNull: false }
  }, {
    tableName: 'review',
    createdAt: 'created_on',
    updatedAt: false
  });
  Review.associate = function(models) {
    Review.belongsTo(models.Customer, { foreignKey: 'customer_id' })
    Review.belongsTo(models.Product, { foreignKey: 'product_id' })
  };
  return Review;
};