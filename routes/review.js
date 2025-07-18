const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview , isLoggedIn} = require("../middleware.js");
const { destroyReview } = require("../controllers/reviews.js");
const reviewController = require("../controllers/reviews.js");
const mongoose = require('mongoose');


//Post route
router.post("/",
  isLoggedIn ,
   validateReview,
    wrapAsync(reviewController.createReview)
);

//delete route
router.delete(
  "/:reviewId",
  wrapAsync(reviewController.destroyReview)
);


module.exports = router;