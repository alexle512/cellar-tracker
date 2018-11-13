/**
 * Imports
 */
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const mustacheExpress = require("mustache-express")
const models = require("./models")

const search = require("./routes/search")

/**
 * Init
 */
const app = express()
app.engine("mustache", mustacheExpress())

// View Engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "mustache")

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Public Files
app.use(express.static(path.join(__dirname, "public")))

/**
 * Custon Middleware
 */

/**
 * Route Config
 */

// SEARCH
app.use("/search", search)

// CELLAR

let cellar = models.wishlist.build({
  beverage: "Stolichnaya Elit",
  price: 25.0,
  notes: "Graduation Party"
})

app.get("/cellar", function(req, res) {
  models.cellar.findAll().then(function(cellers) {
    res.render("cellar", { lists: cellers })
  })
})

app.get("/favorites", function(req, res) {
  models.favorite.findAll().then(function(favorites) {
    res.render("favorites", { favorites: favorites })
  })
})

app.post("/delete-wishlist", function(req, res) {
  let id = req.body.wishlistId
  console.log(id)

  models.wishlist.findById(id).then(function(wishlist) {
    wishlist.destroy()

    res.render("delete-wishlist", { beverage: wishlist.beverage })
  })
})

app.get("/wishlist", function(req, res) {
  models.wishlist.findAll().then(function(wishlists) {
    res.render("wishlist", { wishlists: wishlists })
  })
})

// Reviews
const review = models.review.build({
  rating: 4,
  product: "Johnnie Walker",
  category: "Whiskey"
})

app.get("/reviews", function(req, res) {
  models.review.findAll().then(function(reviews) {
    res.render("index", { reviews: reviews })
  })
})

app.post("/reviews", function(req, res) {
  let product = req.body.product
  let rating = req.body.rating
  let category = req.body.category
  const review = models.review.build({
    rating: rating,
    product: product,
    category: category
  })

  // saving review
  review.save().then(function(newReview) {
    models.review.findAll().then(function(reviews) {
      res.render("index", { reviews: reviews })
    })
  })
})

module.exports = app
