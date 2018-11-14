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
//   cellar.save().then(function(){
// })
app.get('/wishlist', function(req,res){
  models.wishlist.findAll().then(function(wishlists){
    res.render('wishlist', {wishlists: wishlists})
  })
})

app.get('/cellar', function(req,res){
  models.cellar.findAll().then(function(cellers){
    res.render('cellar', {lists: cellers})
  })
})

app.get("/favorites", function(req, res) {
  models.favorite.findAll().then(function(favorites) {
    res.render("favorites", { favorites: favorites })
  })
})

app.post("/delete-wishlist", function(req, res) {
  let id = req.body.wishlistId

  models.wishlist.findById(id).then(function(wishlist) {
    wishlist.destroy()

    res.render('delete-wishlist', {beverage: wishlist.beverage})

    })

  })
})

 app.post('/update-wishlist', function(req, res) {

   let id = req.body.wishlistId

   let beverage = req.body.beverage

   let price = parseFloat(req.body.price)

   let notes = req.body.notes

   models.wishlist.findById(id).then(function(wishlist){
     wishlist.update({
       beverage: beverage,
       price : price,
       notes : notes
     }).then(function(){

        res.render('update-wishlist')
     })

   })

 })

app.get('/update-wishlist/:id', function(req, res) {

  let id = req.params.id

  models.wishlist.findById(id).then(function(wishlist){
    res.render('update-wishlist',{id: wishlist.id,beverage: wishlist.beverage, price: wishlist.price, notes: wishlist.notes})
  })


})

module.exports = app
