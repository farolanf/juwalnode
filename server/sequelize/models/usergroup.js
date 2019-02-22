'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    user_group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    group: { type: DataTypes.STRING(50), allowNull: false }
  }, {
    tableName: 'user_group'
  });
  return UserGroup;
};