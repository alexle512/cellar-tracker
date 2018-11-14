const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const models = require('./models')
const bodyParser = require('body-parser')
var session = require('express-session')

app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

app.use(bodyParser.urlencoded({ extended: false}))


const review = models.review.build({
    rating: 4,
    product: "Johnnie Walker",
    category: "Whiskey",

})



// saving review
// review.save().then(function(newReview){
//     console.log(newReview)
// })


//delete item
// models.review.destroy({
//     where: {
//         product: "Johnnie Walker"
//     }
// }).then(function(){
// })


app.get('/reviews', function (req,res){

    models.review.findAll().then(function(reviews){

        res.render('review',{reviews : reviews})
    })
    
})


app.post('/reviews', function (req,res){
    
    
    
    let product = req.body.product
    let rating = req.body.rating
    let category = req.body.category

    
    const review = models.review.build({
    rating: rating,
    product: product,
    category: category,
})



// saving review
review.save().then(function(newReview){
    models.review.findAll().then(function(reviews){

        res.render('review',{reviews : reviews})
    })
})
})












app.listen(3000,function(req,res){
    console.log("Server has started....")
  })
  
