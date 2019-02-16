'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define('Attribute', {
    attribute_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: DataTypes.STRING(100), allowNull: false }
  }, {
    tableName: 'attribute',
    timestamps: false,
  });
  return Attribute;
};