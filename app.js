/**
 * Imports
 */
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const search = require('./routes/search')
const session = require('express-session')

const models = require('./models')
const { checkForUser } = require('./controllers/searchController')
/**
 * Init
 */
const app = express()

// View Engine
app.engine('mustache', mustacheExpress())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Public Files
app.use(express.static(path.join(__dirname, 'public')))

// Sessions
app.use(
  session({
    secret: 'rigby',
    resave: false,
    saveUninitialized: true
  })
)

/**
 * Custon Middleware
 */
app.use('/cellar', checkForUser)
app.use('/myCellar', checkForUser)
app.use('/reviews', checkForUser)

/**
 * Route Config
 */

// Login
app.get('/login', function(req, res) {
  res.render('login')
})

app.post('/login', function(req, res) {
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
        res.render('login', { message: 'Invalid username/password...' })
      } else {
        if (req.session) {
          req.session.userid = user.id
          req.session.username = user.username
        }

        res.redirect('/myCellar')
      }
    })
})

app.post('/register', function(req, res) {
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
        res.render('register', { message: 'Username is already registered...' })
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
          res.redirect('/login')
        })
      }
    })
})

// SIGN OUT
app.post('/logout', function(req, res) {
  req.session.destroy()
  res.redirect('login')
})

app.get('/logout', function(req, res) {
  req.session.destroy()
  res.redirect('login')
})

app.get('/myCellar', function(req, res) {
  res.render('myCellar')
})

app.get('/register', function(req, res) {
  res.render('register')
})

app.get('/', function(req, res) {
  res.render('login')
})

// SEARCH
app.use('/search', search)

// CELLAR
app.get('/cellar', function(req, res) {
  models.cellar
    .findAll({
      where: { user_id: req.session.userid }
    })
    .then(function(cellars) {
      res.render('cellar', { cellers: cellars, username: req.session.username })
    })
})

app.post('/cellar', function(req, res) {
  const title = req.body.title
  const creator = req.body.creator
  const review = req.body.review
  const category = req.body.category
  const cellar = models.cellar.build({
    title: title,
    creator: creator,
    review: review,
    category: category,
    user_id: req.session.userid
  })
  cellar.save().then(function() {
    res.redirect('/cellar')
  })
})

app.post('/delete-cellar', function(req, res) {
  let id = req.body.cellarId
  models.cellar.findById(id).then(function(cellar) {
    cellar.destroy()
    res.render('delete-cellar', { title: cellar.title })
  })
})

app.post('/update-cellar', function(req, res) {
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
        res.render('update-cellar')
      })
  })
})

app.get('/update-cellar/:id', function(req, res) {
  let id = req.params.id
  models.cellar.findById(id).then(function(cellar) {
    res.render('update-cellar', {
      id: cellar.id,
      title: cellar.title,
      price: cellar.price,
      notes: cellar.notes
    })
  })
})

// Reviews
app.get('/reviews', function(req, res) {
  const product = req.body.title || ''
  models.review
    .findAll({ where: { user_id: req.session.userid } })
    .then(function(reviews) {
      res.render('review', {
        reviews: reviews,
        product: product,
        hasReviews: reviews.length > 0
      })
    })
})

app.post('/reviews-add', (req, res) => {
  const product = req.body.title || ''
  models.review
    .findAll({ where: { user_id: req.session.userid } })
    .then(function(reviews) {
      res.render('review', {
        reviews: reviews,
        product: product,
        hasReviews: reviews.length > 0
      })
    })
})

app.post('/reviews/:review_id/delete', (req, res) => {
  const reviewId = req.params.review_id
  models.review.findById(reviewId).then((reviewEntry) => {
    reviewEntry.destroy()
    res.redirect('/reviews')
  })
})

app.post('/reviews', function(req, res) {
  let product = req.body.product
  let rating = req.body.rating
  let category = req.body.category
  console.log(req.session.userid)
  const userId = req.session.userid

  const review = models.review.build({
    rating: rating,
    product: product,
    category: category,
    user_id: userId
  })

  review.save().then(function() {
    models.review
      .findAll({ where: { user_id: req.session.userid } })
      .then(function(reviews) {
        res.render('review', {
          reviews: reviews,
          hasReviews: reviews.length > 0
        })
      })
  })
})

app.use((req, res, next) => {
  res.redirect('/myCellar')
})

module.exports = app
