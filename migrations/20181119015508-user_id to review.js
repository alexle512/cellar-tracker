'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('reviews', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users_databases',
        key: 'id'
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('cellars', 'user_id')
  }
}
