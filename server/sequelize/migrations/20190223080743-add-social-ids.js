'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.addColumn('user', 'facebook_id', {
      type: Sequelize.STRING(100),
      allowNull: true,
    })
    await queryInterface.addColumn('user', 'google_id', {
      type: Sequelize.STRING(100),
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.removeColumn('user', 'facebook_id')
    await queryInterface.removeColumn('user', 'google_id')
  }
};
