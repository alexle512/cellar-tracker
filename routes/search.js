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

router
  .route("/:type")
  .get(displaySearch)
  .post(querySearch)

module.exports = router
