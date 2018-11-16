'use strict';
module.exports = (sequelize, DataTypes) => {
  const cellar = sequelize.define('cellar', {
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    notes: DataTypes.STRING,
    category: DataTypes.STRING,
    review: DataTypes.STRING,
    creator: DataTypes.STRING,
    user_id: DataTypes.INTEGER

  }, {});
  cellar.associate = function(models) {
    // associations can be defined here
  };
  return cellar;
};
