/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "wine",
    {
      col1847: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "_col1847",
        primaryKey: true
      },
      unnamed0: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "unnamed__0"
      },
      country: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "country"
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "description"
      },
      designation: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "designation"
      },
      points: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "points"
      },
      price: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "price"
      },
      province: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "province"
      },
      region1: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "region_1"
      },
      region2: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "region_2"
      },
      tasterName: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "taster_name"
      },
      tasterTwitterHandle: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "taster_twitter_handle"
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "title"
      },
      variety: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "variety"
      },
      winery: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "winery"
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
      tableName: "wine",
      timestamps: false
    }
  )
}
