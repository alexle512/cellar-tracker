/**
 * Imports
 */
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

/**
 * Init
 */
const app = express()

// View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Public Files
app.use(express.static(path.join(__dirname, 'public')))

/**
 * Custon Middleware
 */

/**
 * Route Config
 */

module.exports = app
