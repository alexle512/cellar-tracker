const Sequelize = require("sequelize")
const config = require(__dirname + "/../config/config")
const { productData } = config

const sequelize = new Sequelize(
  productData.database,
  productData.username,
  productData.password,
  {
    host: productData.host,
    dialect: "postgres"
  }
)
const beerReviews = require("../models/beerreviews")(
  sequelize,
  Sequelize.DataTypes
)
const wineReviews = require("../models/winedata")(
  sequelize,
  Sequelize.DataTypes
)
let searchResults = { beers: [], wines: [], spirits: [] }

const displaySearch = async (req, res) => {
  res.render("search", { searchResults })
}

const querySearch = async (req, res) => {
  const itemName = req.body.itemName
  const beers =
    (await beerReviews.findAll({
      where: { beer_name: { $ilike: `%${itemName}%` } }
    })) || []
  const wines =
    (await wineReviews.findAll({
      where: { title: { $ilike: `%${itemName}%` } }
    })) || []
  searchResults = { beers, wines }
  res.redirect("/search")
}

module.exports = {
  displaySearch,
  querySearch
}
