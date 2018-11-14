/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "beer",
    {
      col1847: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "_col1847"
      },
      breweryId: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "brewery_id"
      },
      breweryName: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "brewery_name"
      },
      reviewTime: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "review_time"
      },
      reviewOverall: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "review_overall"
      },
      reviewAroma: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "review_aroma"
      },
      reviewAppearance: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "review_appearance"
      },
      reviewProfilename: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "review_profilename"
      },
      beerStyle: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "beer_style"
      },
      reviewPalate: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "review_palate"
      },
      reviewTaste: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "review_taste"
      },
      beerName: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "beer_name"
      },
      beerAbv: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "beer_abv"
      },
      beerBeerid: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "beer_beerid",
        primaryKey: true
      },
      reviewTotal: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "review_total"
      },
      reviewCount: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "review_count"
      },
      reviewAverage: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "review_average"
      }
    },
    {
      tableName: "beer",
      timestamps: false
    }
  )
}
