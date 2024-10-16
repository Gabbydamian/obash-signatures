const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  address: String,
  city: String,
  price: Number,
  details: String,
  zipCode: String,
  images: [String], // Storing image URLs
  type: String,
  description: String, // New field for the description of the house
});

module.exports =
  mongoose.models.Listing || mongoose.model("Listing", listingSchema);
