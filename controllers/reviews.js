const Listing = require("../models/listing");
const Review = require("../models/reviews");
const mongoose = require('mongoose');


module.exports.createReview = async (req, res) => {
    let id = req.params.id.trim(); 
    console.log(req.params.id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send(" Invalid Listing ID");
    }

    const listing = await Listing.findById(id);
    if (!listing) {
        return res.status(404).send("Listing not found");
    }

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
  };