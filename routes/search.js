const express = require("express")
const {
  displaySearch,
  querySearch
} = require("../controllers/searchController")
const router = express.Router()

/**********************
 * Routes for /search
 * ********************/

/**
 * Middleweare
 */

/**
 * Routes
 */

router
  .route("/")
  .get(displaySearch)
  .post(querySearch)
//.post(querySearch)

module.exports = router
