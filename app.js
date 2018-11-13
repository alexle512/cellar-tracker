const express = require("express")
const app = express()
const mustacheExpress = require("mustache-express")
const models = require("./models")
const bodyParser = require("body-parser")
const port = 3000

app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

app.use(bodyParser.urlencoded({ extended: false }))

let cellar = models.wishlist.build({
  beverage: "Stolichnaya Elit",
  price: 25.0,
  notes: "Graduation Party"
})
//   cellar.save().then(function(){
// })

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

  // wishlist = wishlist.filter(function(list) {
  //   return list.beverage != beverage
})

app.get("/wishlist", function(req, res) {
  models.wishlist.findAll().then(function(wishlists) {
    res.render("wishlist", { wishlists: wishlists })
  })
})

module.exports = app
