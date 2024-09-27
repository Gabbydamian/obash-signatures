// import { connectToDatabase } from "@/lib/mongodb";
// import Listing from "@/models/Listing";
import { connectToDatabase } from "../../../lib/mongodb";
import Listing from "../../../models/Listing";

export async function GET(req, res) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all listings
    const listings = await Listing.find({});

    return new Response(JSON.stringify(listings), { status: 200 });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return new Response("Server Error", { status: 500 });
  }
}
