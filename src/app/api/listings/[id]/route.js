// import { connectToDatabase } from "@/lib/mongodb";
// import Listing from "@/models/Listing";

import { connectToDatabase } from "../../../../lib/mongodb";
import Listing from "../../../../models/Listing";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    const listing = await Listing.findById(params.id);

    if (!listing) {
      return new Response("Listing not found", { status: 404 });
    }

    return new Response(JSON.stringify(listing), { status: 200 });
  } catch (error) {
    console.error("Error fetching listing by ID:", error);
    return new Response("Server Error", { status: 500 });
  }
}
