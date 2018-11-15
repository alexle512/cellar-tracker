'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn(
      'cellars',
      'category', {
        type: Sequelize.STRING
      }
    )

    queryInterface.renameColumn('cellars', 'beverage', 'title')

    queryInterface.addColumn(
      'cellars',
      'user_id',{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users_databases',
          key: 'id'

      }
    }
  )
  },

  down: (queryInterface, Sequelize) => {

    queryInterface.removeColumn('cellars',
  'category')

    queryInterface.renameColumn('cellars', 'title', 'beverage')

    queryInterface.removeColumn(
      'cellars',
      'user_id')
  }
};
