/**
 * Imports
 */
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const mustacheExpress = require("mustache-express")

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
app.use("/search", search)

module.exports = app
