import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  address: String,
  zipCode: String,
  price: String,
  city: String,
  details: String,
  type: String,
  images: [String],
});

const Listing =
  mongoose.models.Listing || mongoose.model("Listing", ListingSchema);

export default Listing;
