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

let searchResults = []

const displaySearch = async (req, res) => {
  res.render("search", { searchResults })
}

const querySearch = async (req, res) => {
  const itemName = req.body.itemName
  const beers = await beerReviews.findAll({
    where: { beer_name: { $ilike: `%${itemName}%` } }
  })
  searchResults = beers
  console.log(searchResults.lengthk)
  res.redirect("/search")
}

module.exports = {
  displaySearch,
  querySearch
}
