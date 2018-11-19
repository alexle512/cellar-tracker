'use strict'
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define(
    'review',
    {
      rating: DataTypes.INTEGER,
      product: DataTypes.STRING,
      category: DataTypes.STRING,
      user_id: DataTypes.INTEGER
    },
    {}
  )
  review.associate = function(models) {
    // associations can be defined here
  }
  return review
}
