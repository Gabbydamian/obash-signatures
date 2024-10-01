// src/models/Listing.js
import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  address: String,
  price: Number,
  details: String,
  images: [String],
  city: String,
  zipCode: String,
});

const Listing =
  mongoose.models.Listing || mongoose.model("Listing", ListingSchema);

export default Listing;
