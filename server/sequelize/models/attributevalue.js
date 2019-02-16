'use strict';
module.exports = (sequelize, DataTypes) => {
  const AttributeValue = sequelize.define('AttributeValue', {
    attribute_value_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    attribute_id: { type: DataTypes.INTEGER, allowNull: false },
    value: { type: DataTypes.STRING(100), allowNull: false }
  }, {
    tableName: 'attribute_value'
  });
  AttributeValue.associate = function(models) {
    AttributeValue.belongsTo(models.Attribute, { foreignKey: 'attribute_id' })
    AttributeValue.belongsToMany(models.Product, {
      through: 'ProductAttribute',
      foreignKey: 'product_id'
    })
  };
  return AttributeValue;
};