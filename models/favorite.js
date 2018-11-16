'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    notes: DataTypes.STRING,
    category: DataTypes.STRING,
    review: DataTypes.STRING,
    creator: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  favorite.associate = function(models) {
    // associations can be defined here
  };
  return favorite;
};
