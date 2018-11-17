const Sequelize = require('sequelize')
const config = require(__dirname + '/../config/config')
const { productData } = config

const sequelize = new Sequelize(
  productData.database,
  productData.username,
  productData.password,
  {
    host: productData.host,
    dialect: 'postgres'
  }
)

const beerDB = require(__dirname + '/../models/beer')(
  sequelize,
  Sequelize.DataTypes
)
const wineDB = require(__dirname + '/../models/wine')(
  sequelize,
  Sequelize.DataTypes
)
const whiskyDB = require(__dirname + '/../models/whisky')(
  sequelize,
  Sequelize.DataTypes
)

let searchResults = { beers: [], wines: [], whisky: [] }

const checkForUser = async (req, res, next) => {
  try {
    if (req.session.username) {
      next()
    } else {
      res.redirect('/login')
    }
  } catch (err) {
    res.redirect('/login')
  }
}

const redirectSearch = async (req, res) => {
  const type = req.params.type || 'beer'
  res.redirect(`/search/${type}`)
}

const displaySearch = async (req, res) => {
  const type = req.params.type || 'beer'
  const noResults = {
    beer: searchResults.beers.length === 0,
    wine: searchResults.wines.length === 0,
    whisky: searchResults.whisky.length === 0
  }
  res.render(`search`, { searchResults, type, noResults })
}

const querySearch = async (req, res) => {
  const type = req.params.type
  const itemName = req.body.itemName
  searchResults = { beers: [], wines: [], whisky: [] }
  const limit = 20
  let offset = 0

  // Fetch From Database / Search
  if (itemName.trim() !== '') {
    const beers = await searchBeers(itemName, limit, offset)
    const wines = await searchWines(itemName, limit, offset)
    const whisky = await searchWhisky(itemName, limit, offset)
    searchResults = {
      beers: beers.rows,
      wines: wines.rows,
      whisky: whisky.rows
    }
  }
  res.redirect(`/search/${type}`)
}

const searchBeers = async (query, limit, offset) =>
  (await beerDB.findAndCountAll({
    where: {
      beer_name: { $ilike: `%${query}%` }
    },
    limit: limit,
    offset: offset
  })) || [(rows = [])]

const searchWines = async (query, limit, offset) =>
  (await wineDB.findAndCountAll({
    where: { title: { $ilike: `%${query}%` } },
    limit: limit,
    offset: offset
  })) || [(rows = [])]

const searchWhisky = async (query, limit, offset) =>
  (await whiskyDB.findAndCountAll({
    where: { whisky: { $ilike: `%${query}%` } },
    limit: limit,
    offset: offset
  })) || [(rows = [])]

const fetchFromInit = () => {
  const wines = allWines.filter(
    (wine) =>
      wine.title.toUpperCase().includes(itemName.toUpperCase()) ||
      wine.winery.toUpperCase().includes(itemName.toUpperCase())
  )
  const beers = allBeers.filter(
    (beer) =>
      beer.beerName.toUpperCase().includes(itemName.toUpperCase()) ||
      beer.breweryName.toUpperCase().includes(itemName.toUpperCase())
  )
}

module.exports = {
  checkForUser,
  redirectSearch,
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
