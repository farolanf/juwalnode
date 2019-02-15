'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING(100), allowNull: false },
    password: { type: DataTypes.STRING(50), allowNull: false },
    customer_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};