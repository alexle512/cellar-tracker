/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "winedata",
    {
      _col1847: {
        type: DataTypes.TEXT,
        allowNull: true,
        primaryKey: true
      },
      country: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      designation: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      points: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      price: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      province: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      region_1: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      region_2: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      taster_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      taster_twitter_handle: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      variety: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      winery: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: "winedata",
      timestamps: false
    }
  )
}
