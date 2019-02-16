'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    department_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(1000), allowNull: false }
  }, {
    tableName: 'category',
    timestamps: false,
  });
  Category.associate = function(models) {
    Category.belongsTo(models.Department, { foreignKey: 'department_id' })
    Category.belongsToMany(models.Product, {
      through: 'ProductCategory',
      foreignKey: 'category_id'
    })
  };
  return Category;
};