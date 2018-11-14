const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const models = require('./models')
const bodyParser = require('body-parser')
const port = 3000
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

app.use(bodyParser.urlencoded({ extended: false}))

let cellar = models.wishlist.build({
  beverage: 'Stolichnaya Elit',
  price: 25.00,
  notes: 'Graduation Party'
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

app.get('/favorites', function(req, res) {
  models.favorite.findAll().then(function(favorites) {
    res.render('favorites', {favorites: favorites})
   })
})

app.post('/delete-wishlist', function(req, res){

  let id = req.body.wishlistId

  models.wishlist.findById(id).then(function(wishlist){

  wishlist.destroy()

    res.render('delete-wishlist', {beverage: wishlist.beverage})

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

  //res.render('update-wishlist',{wishlistId: id})
  /*
  models.wishlist.findById(id).then(function(wishlist) {
    wishlist.update({
      beverage: beverage,
      price: price,
      notes : notes
    }).then(function(updateWishlist){
      res.render('wishlist')
    })
  }) */
})







app.listen(port, function(req,res) {
  console.log(" Welcome Back to Coding......")
})
