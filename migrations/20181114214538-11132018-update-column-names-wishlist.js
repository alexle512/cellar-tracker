'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn(
      'wishlists',
      'wishlist_id', {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }
    )
    queryInterface.renameColumn('wishlists', 'beverage', 'title')

    queryInterface.addColumn(
      'wishlists',
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

      queryInterface.removeColumn(
        'wishlists', 'wishlist_id')

      queryInterface.renameColumn('wishlists', 'title', 'beverage')

      queryInterface.removeColumn(
        'wishlists',
        'user_id')

  }
};
