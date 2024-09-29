

import { connectToDatabase } from "../../../../lib/mongodb";
import Listing from "../../../../models/Listing";
import { NextResponse } from "next/server";

// Handler for the GET request with dynamic [id] parameter
export async function GET(req, { params }) {
  try {
    // Connect to the MongoDB database
    await connectToDatabase();

    // Fetch the listing by the provided ID
    const listing = await Listing.findById(params.id);

    if (!listing) {
      // Return a 404 response if the listing is not found
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      );
    }

    // Return the listing as a JSON response
    return NextResponse.json(listing, { status: 200 });
  } catch (error) {
    console.error("Error fetching listing by ID:", error);

    // Return a 500 error response if there's a server error
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}