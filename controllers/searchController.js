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
const beerDB = require("../models/beer")(sequelize, Sequelize.DataTypes)
const wineDB = require("../models/wine")(sequelize, Sequelize.DataTypes)

let searchResults = { beers: [], wines: [], spirits: [] }

let allWines = []
let allBeers = []

/**
 * Fetch From Database on Server Load
 */
const onLoad = async () => {
  allWines = await wineDB.findAll()
  allBeers = await beerDB.findAll()
}
onLoad()
// End Fetch From db on server load

const displaySearch = async (req, res) => {
  res.render("search", { searchResults })
}

const querySearch = async (req, res) => {
  const itemName = req.body.itemName
  /**
   * Fetch From Database / Search
   */
  // const beers =
  //   (await beerDB.findAll({
  //     where: { beer_name: { $ilike: `%${itemName}%` } }
  //   })) || []
  // const wines =
  //   (await wineDB.findAll({
  //     where: { title: { $ilike: `%${itemName}%` } }
  //   })) || []
  /**
   * Fetch From Database on Server Load
   */
  const wines = allWines.filter(
    wine =>
      wine.title.toUpperCase().includes(itemName.toUpperCase()) ||
      wine.winery.toUpperCase().includes(itemName.toUpperCase())
  )
  const beers = allBeers.filter(
    beer =>
      beer.beerName.toUpperCase().includes(itemName.toUpperCase()) ||
      beer.breweryName.toUpperCase().includes(itemName.toUpperCase())
  )
  searchResults = { beers, wines }
  res.redirect("/search")
}

module.exports = {
  displaySearch,
  querySearch
}
