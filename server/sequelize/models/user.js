'use strict';
const bcrypt = require('bcrypt')

const saltRounds = 10

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING(100), allowNull: false },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
      set (val) {
        this.setDataValue('password', User.generatePassword(val))
      }
    },
    customer_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  User.generatePassword = function (plain) {
    return bcrypt.hashSync(plain, saltRounds)
  }
  User.prototype.verifyPassword = function (plain) {
    return bcrypt.compareSync(plain, this.password)
  }
  return User;
};