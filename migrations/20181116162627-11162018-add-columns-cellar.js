'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn(
      'cellars',
      'creator', {
        type: Sequelize.STRING
      }
    )

    queryInterface.addColumn(
      'cellars',
      'review', {
        type: Sequelize.STRING
      }
    )

  },

  down: (queryInterface, Sequelize) => {

  queryInterface.removeColumn('cellars',
  'creator')


  queryInterface.removeColumn('cellars',
  'review')
}
}
