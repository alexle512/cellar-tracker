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

app.get('/wishlist', function(req,res){
  models.wishlist.findAll().then(function(wishlists){
    res.render('wishlist', {wishlists: wishlists})
  })
})














app.listen(port, function(req,res) {
  console.log(" Welcome Back to Coding......")
})
