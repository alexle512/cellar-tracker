const express = require("express")
const {
  checkForUser,
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

router.use(checkForUser)

/**
 * Routes
 */
router.route("/").get(redirectSearch)

router
  .route("/:type")
  .get(displaySearch)
  .post(querySearch)

module.exports = router
