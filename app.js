/**
 * Imports
 */
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const mustacheExpress = require("mustache-express")
const search = require("./routes/search")
const session = require("express-session")

const models = require("./models")
/**
 * Init
 */
const app = express()

// View Engine
app.engine("mustache", mustacheExpress())
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "mustache")

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Public Files
app.use(express.static(path.join(__dirname, "public")))

// Sessions
app.use(
  session({
    secret: "rigby",
    resave: false,
    saveUninitialized: true
  })
)

/**
 * Custon Middleware
 */

/**
 * Route Config
 */

// Login
app.get("/login", function(req, res) {
  res.render("login")
})

app.post("/login", function(req, res) {
  let username = req.body.username
  let password = req.body.password

  models.users_database
    .findOne({
      where: {
        username: username,
        password: password
      }
    })
    .then(function(user) {
      if (!user) {
        res.render("login", { message: "Invalid username/password..." })
      } else {
        if (req.session) {
          req.session.userid = user.id
          req.session.username = user.username
        }

        res.redirect("/myCellar")
      }
    })
})

app.post("/register", function(req, res) {
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password

  // find if the username has already been registered
  models.users_database
    .findOne({
      where: {
        username: username
      }
    })
    .then(function(user) {
      // this user with username already exists
      if (user) {
        // this means that user exists
        res.render("register", { message: "Username is already registered..." })
      } else {
        // if username does not exist already in database
        // save user in the database

        let userToSave = models.users_database.build({
          username: username,
          password: password,
          email: email,
          firstname: firstName,
          lastname: lastName
        })

        userToSave.save().then(function(newUser) {
          res.redirect("/login")
        })
      }
    })
})

app.get("/myCellar", function(req, res) {
  res.render("myCellar")
})

app.get("/register", function(req, res) {
  res.render("register")
})

app.get("/", function(req, res) {
  res.render("login")
})

// SEARCH
app.use("/search", search)

// CELLAR

// let cellar = models.favorite.build({
//
//   title: "Steampunk Octopus Spirit",
//   price: 78.98,
//   notes: "Christmas",
//   user_id: 2
//
// })

// cellar.save().then(function() {
//
//   })

// if(!$('input').val()){
//     $('#button').hide();
// }
// else {
//     $('#button').show();
// }
app.get("/wishlist", function(req, res) {
  models.wishlist.findAll().then(function(wishlists) {
    res.render("wishlist", { wishlists: wishlists })
  })
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

app.post("/cellar", function(req, res) {
  let title = req.body.title
  let creator = req.body.creator
  let review = req.body.review
  let category = req.body.category

  let cellar = models.cellar.build({
    title: title,
    creator: creator,
    review: review,
    category: category
  })
  beer.save().then(function() {
    res.render("cellar", { cellar: cellar })
  })
})

app.post("/delete-cellar", function(req, res) {
  let id = req.body.cellarId

  models.cellar.findById(id).then(function(cellar) {
    cellar.destroy()

    res.render("delete-cellar", { title: cellar.title })
  })
})

app.post("/update-cellar", function(req, res) {
  let id = req.body.cellarId

  let title = req.body.title

  let creator = req.body.creator

  let review = req.body.review

  let category = req.body.category

  let price = parseFloat(req.body.price)

  let notes = req.body.notes

  models.cellar.findById(id).then(function(cellar) {
    cellar
      .update({
        price: price,
        notes: notes
      })
      .then(function() {
        res.render("update-cellar")
      })
  })
})

app.get("/update-cellar/:id", function(req, res) {
  let id = req.params.id

  models.cellar.findById(id).then(function(cellar) {
    res.render("update-cellar", {
      id: cellar.id,
      title: cellar.title,
      price: cellar.price,
      notes: cellar.notes
    })
  })
})

app.post("/wishlist", function(req, res) {
  let title = req.body.title
  let creator = req.body.creator
  let review = req.body.review
  let category = req.body.category

  let wishlist = models.wishlist.build({
    title: title,
    creator: creator,
    review: review,
    category: category
  })
  wishlist.save().then(function() {
    res.render("cellar", { wishlists: wishlists })
  })
})

app.get("/reviews", function(req, res) {
  models.review.findAll().then(function(reviews) {
    res.render("review", { reviews: reviews })
  })
})

app.post("/delete-wishlist", function(req, res) {
  let id = req.body.wishlistId

  models.wishlist.findById(id).then(function(wishlist) {
    wishlist.destroy()

    res.render("delete-wishlist", { title: wishlist.title })
  })
})

app.post("/update-wishlist", function(req, res) {
  let id = req.body.wishlistId

  let title = req.body.title

  let creator = req.body.creator

  let review = req.body.review

  let category = req.body.category

  let price = parseFloat(req.body.price)

  let notes = req.body.notes

  models.wishlist.findById(id).then(function(wishlist) {
    wishlist
      .update({
        price: price,
        notes: notes
      })
      .then(function() {
        res.render("update-wishlist")
      })
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

  review.save().then(function(newReview) {
    models.review.findAll().then(function(reviews) {
      res.render("review", { reviews: reviews })
    })
  })
})

app.get("/update-wishlist/:id", function(req, res) {
  let id = req.params.id

  models.wishlist.findById(id).then(function(wishlist) {
    res.render("update-wishlist", {
      id: wishlist.id,
      title: wishlist.title,
      price: wishlist.price,
      notes: wishlist.notes
    })
  })
})

app.post("/favorites", function(req, res) {
  let title = req.body.title
  let creator = req.body.creator
  let review = req.body.review
  let category = req.body.category

  let favorite = models.favorite.build({
    title: title,
    creator: creator,
    review: review,
    category: category
  })
  favorite.save().then(function() {
    res.render("cellar", { favorites: favorites })
  })
})

app.post("/delete-favorites", function(req, res) {
  let id = req.body.favoritestId

  models.favorite.findById(id).then(function(favorites) {
    favorites.destroy()

    res.render("delete-favorite", { title: favorites.title })
  })
})

app.post("/update-favorites", function(req, res) {
  let id = req.body.favoritesId

  let title = req.body.title

  let creator = req.body.creator

  let review = req.body.review

  let category = req.body.category

  let price = parseFloat(req.body.price)

  let notes = req.body.notes

  models.favorite.findById(id).then(function(favorites) {
    favorites
      .update({
        price: price,
        notes: notes
      })
      .then(function() {
        res.render("update-favorites")
      })
  })
})

app.get("/update-favorites/:id", function(req, res) {
  let id = req.params.id

  models.favorite.findById(id).then(function(favorites) {
    res.render("update-favorites", {
      id: favorites.id,
      title: favorites.title,
      price: favorites.price,
      notes: favorites.notes
    })
  })
})

// Reviews
app.get("/reviews", function(req, res) {
  models.review.findAll().then(function(reviews) {
    res.render("review", { reviews: reviews })
  })
})

app.post("/reviews", function(req, res) {
  let product = req.body.product
  let rating = req.body.rating
  let category = req.body.category
})

module.exports = app
