const express = require('express')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const models = require('./models')

// PICTURE UPLOAD
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
// PICTURE UPLOAD
const app = express()
const PORT = 3000


app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')


app.use(session({
  secret: 'rigby',
  resave: false,
  saveUninitialized: true
}))


app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('css'))


app.get('/login',function(req,res){
  res.render('login')
})

app.post('/login',function(req,res){
  let username = req.body.username
  let password = req.body.password

  models.users_database.findOne({
    where: {
      username: username,
      password: password
    }
  }).then(function(user){

    if(!user) {
      res.render('login',{message: 'Invalid username/password...'})
    } else {

      if(req.session) {
        req.session.userid = user.id
        req.session.username = user.username
      }


      res.redirect('/myCellar')
    }

  })

})

app.post('/register', upload.single('userIMG'),function(req,res){

  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let userIMG = req.file.userIMG
  console.log(userIMG)

  // find if the username has already been registered
  models.users_database.findOne({
    where: {
      username : username
    }
  }).then(function(user){
    // this user with username already exists
    if(user) { // this means that user exists
      res.render('register', { message : 'Username is already registered...' })
    } else { // if username does not exist already in database
      // save user in the database

      let userToSave = models.users_database.build({
        username: username,
        password: password,
        email: email,
        first_name: firstName,
        last_name: lastName,
        picture: userIMG
      })

      userToSave.save().then(function(newUser){
          res.redirect('/login')
      })
    }
  })
})

app.get('/myCellar',function(req,res){
  res.render('myCellar')
})

app.get('/register',function(req,res){
  res.render('register')
})

app.get('/',function(req,res){
  res.render('login')
})


app.listen(PORT,function(req,res){
  console.log('Server is running...')
})
