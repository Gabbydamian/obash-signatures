import { connectToDatabase } from "../../../lib/mongodb";
import Listing from "../../../models/Listing";
import { NextResponse } from "next/server";

// Handler for the GET request
export async function GET() {
  try {
    // Connect to the MongoDB database
    await connectToDatabase();

    // Fetch all listings from the database
    const listings = await Listing.find({});

    // Return the listings as a JSON response
    return NextResponse.json(listings, { status: 200 });
  } catch (error) {
    console.error("Error fetching listings:", error);

    // Return an error response if something goes wrong
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
