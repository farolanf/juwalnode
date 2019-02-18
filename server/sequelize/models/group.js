'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: DataTypes.STRING(50), allowNull: false }
  }, {
    tableName: 'group'
  });
  Group.associate = function(models) {
    Group.belongsToMany(models.User, { through: 'UserGroup', foreignKey: 'group_id' })
  };
  return Group;
};