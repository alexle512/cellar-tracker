'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.renameColumn('wishlists','wishlist_id','id')

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
