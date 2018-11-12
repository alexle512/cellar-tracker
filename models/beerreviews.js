"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "beerreviews",
    {
      brewery_id: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      brewery_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      review_time: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      review_overall: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      review_aroma: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      review_appearance: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      review_profilename: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      beer_style: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      review_palate: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      review_taste: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      beer_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      beer_abv: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      beer_beerid: {
        type: DataTypes.TEXT,
        allowNull: true,
        primaryKey: true
      }
    },
    {
      tableName: "beerreviews",
      timestamps: false
    }
  )
}
