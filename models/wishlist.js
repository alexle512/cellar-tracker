'use strict';
module.exports = (sequelize, DataTypes) => {
  const wishlist = sequelize.define('wishlist', {
    beverage: DataTypes.STRING,
    price: DataTypes.FLOAT,
    notes: DataTypes.STRING
  }, {});
  wishlist.associate = function(models) {
    // associations can be defined here
  };
  return wishlist;
};