// src/models/Listing.js

const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  address: String,
  city: String,
  price: Number,
  details: String,
  zipCode: String,
  images: [String],
  type: String,
});

// Check if the model is already compiled
module.exports =
  mongoose.models.Listing || mongoose.model("Listing", listingSchema);
