'use strict';
module.exports = (sequelize, DataTypes) => {
  const Audit = sequelize.define('Audit', {
    audit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    code: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'audit',
    createdAt: 'created_on',
    updatedAt: false
  });
  Audit.associate = function(models) {
    Audit.belongsTo(models.Order, { foreignKey: 'order_id' })
  };
  return Audit;
};