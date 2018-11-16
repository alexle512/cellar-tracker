'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      queryInterface.addColumn(
        'review',
        'user_id',{
          type:Sequelize.INTEGER,
          allowNull:false,
          references:{
            model:'users_databases',
            key:'id'
          }
        }
      )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'review',
      'user_id'
    )
  }
};
