'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn(
      'favorites',
      'creator', {
        type: Sequelize.STRING
      }
    )

    queryInterface.addColumn(
      'favorites',
      'review', {
        type: Sequelize.STRING
      }
    )
  },

  down: (queryInterface, Sequelize) => {

    queryInterface.removeColumn('favorites',
    'creator')


    queryInterface.removeColumn('favorites',
    'review')
  }
};
