const express = require("express")
const {
  displaySearch,
  querySearch,
  redirectSearch
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
router.route("/").get(redirectSearch)

router
  .route("/:type")
  .get(displaySearch)
  .post(querySearch)

module.exports = router
