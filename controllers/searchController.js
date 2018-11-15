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
const whiskyDB = require("../models/whisky")(sequelize, Sequelize.DataTypes)

let searchResults = { beers: [], wines: [], spirits: [] }

let allWines = []
let allBeers = []

/**
 * Fetch From Database on Server Load
 */
// const onLoad = async () => {
//   allWines = await wineDB.findAll()
//   allBeers = await beerDB.findAll()
// }
// onLoad()
// End Fetch From db on server load

const displaySearch = async (req, res) => {
  res.render("search", { searchResults })
}

const querySearch = async (req, res) => {
  const type = req.params.type
  const itemName = req.body.itemName
  const limit = 20
  let offset = 0
  switch (type) {
    case "wine":
    case "beer":
    case "spirits":
    default:
  }

  /**
   * Fetch From Database / Search
   */
  const beers = (await beerDB.findAndCountAll({
    where: {
      beer_name: { $ilike: `%${itemName}%` }
    },
    limit: limit,
    offset: offset
  })) || [(rows = [])]
  const wines = (await wineDB.findAndCountAll({
    where: { title: { $ilike: `%${itemName}%` } },
    limit: limit,
    offset: offset
  })) || [(rows = [])]
  searchResults = { beers: beers.rows, wines: wines.rows }
  res.redirect("/search")
}

const searchBeers = async (req, res) => {}

const searchWines = async (req, res) => {}

const searchSpirits = async (req, res) => {}

const fetchFromInit = () => {
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
}

module.exports = {
  displaySearch,
  querySearch
}

/**
router.get("/:page", (req, res) => {
  let limit = 50 // number of records per page
  let offset = 0
  db.user
    .findAndCountAll()
    .then(data => {
      let page = req.params.page // page number
      let pages = Math.ceil(data.count / limit)
      offset = limit * (page - 1)
      db.user
        .findAll({
          attributes: ["id", "first_name", "last_name", "date_of_birth"],
          limit: limit,
          offset: offset,
          $sort: { id: 1 }
        })
        .then(users => {
          res
            .status(200)
            .json({ result: users, count: data.count, pages: pages })
        })
    })
    .catch(function(error) {
      res.status(500).send("Internal Server Error")
    })
})
*/
