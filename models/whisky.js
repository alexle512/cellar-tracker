/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "whisky",
    {
      col1847: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "_col1847",
        primaryKey: true
      },
      whisky: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "whisky"
      },
      cost: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "cost"
      },
      class: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "class"
      },
      country: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "country"
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "type"
      },
      brand: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "brand"
      },
      reviews: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "reviews"
      }
    },
    {
      tableName: "whisky",
      timestamps: false
    }
  )
}
