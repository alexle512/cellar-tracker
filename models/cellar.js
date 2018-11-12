'use strict';
module.exports = (sequelize, DataTypes) => {
  const cellar = sequelize.define('cellar', {
    beverage: DataTypes.STRING,
    price: DataTypes.FLOAT,
    notes: DataTypes.STRING
  }, {});
  cellar.associate = function(models) {
    // associations can be defined here
  };
  return cellar;
};