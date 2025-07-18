const mongoose = require('mongoose');
const Review = require("./reviews");
const { string } = require('joi');


const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        filename: String,
        url: String
       // type: String, // using just a URL string
        //required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews: [ 
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner : {
         type: Schema.Types.ObjectId,
         ref: "User",
    },
    geometry: {
    type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
},

});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
