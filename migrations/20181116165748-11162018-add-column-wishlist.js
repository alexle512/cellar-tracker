'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

        queryInterface.addColumn(
          'wishlists',
          'creator', {
            type: Sequelize.STRING
          }
        )

        queryInterface.addColumn(
          'wishlists',
          'review', {
            type: Sequelize.STRING
          }
        )

        queryInterface.addColumn(
          'wishlists',
          'category', {
            type: Sequelize.STRING
          }
        )

      },

      down: (queryInterface, Sequelize) => {

        queryInterface.removeColumn('wishlists',
        'creator')

        queryInterface.removeColumn('wishlists',
        'review')

        queryInterface.removeColumn('wishlists',
        'category')
      }
    };
