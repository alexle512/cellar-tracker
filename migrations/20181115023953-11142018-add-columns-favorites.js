'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn(
      'favorites',
      'category', {
        type: Sequelize.STRING
      }
    )

    queryInterface.renameColumn('favorites', 'beverage', 'title')

    queryInterface.addColumn(
      'favorites',
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

    queryInterface.removeColumn('favorites',
'category')

    queryInterface.renameColumn('favorites', 'title', 'beverage')

    queryInterface.removeColumn(
      'favorites',
      'user_id')
  }
};
