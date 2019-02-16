'use strict';
const bcrypt = require('bcrypt')

const saltRounds = 10

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: { type: DataTypes.STRING(100), allowNull: false },
    username: { type: DataTypes.STRING(50), allowNull: false },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set (val) {
        this.setDataValue('password', User.generatePassword(val))
      }
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'users',
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    }
  });
  User.associate = function (models) {
    User.belongsTo(models.Customer, { foreignKey: 'customer_id' })
  };
  User.generatePassword = function (plain) {
    return bcrypt.hashSync(plain, saltRounds)
  }
  User.prototype.verifyPassword = function (plain) {
    return bcrypt.compareSync(plain, this.password)
  }
  return User;
};