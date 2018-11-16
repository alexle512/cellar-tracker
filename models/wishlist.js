'use strict';
module.exports = (sequelize, DataTypes) => {
  const wishlist = sequelize.define('wishlist', {
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    notes: DataTypes.STRING,
    category: DataTypes.STRING,
    review: DataTypes.STRING,
    creator: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  wishlist.associate = function(models) {
    // associations can be defined here
  };
  return wishlist;
};
