'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.removeConstraint('product_attribute', 'PRIMARY')
    await queryInterface.addColumn('product_attribute', 'product_attribute_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      first: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.removeColumn('product_attribute', 'product_attribute_id')
    await queryInterface.addConstraint(
      'product_attribute',
      ['product_id', 'attribute_value_id'],
      {
        type: 'primary key',
      }
    )
  }
};
