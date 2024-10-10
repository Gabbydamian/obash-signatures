// src/app/api/listings/route.js

import { connectToDatabase } from "@/utils/dbConnect";

export async function GET(request) {
  try {
    const db = await connectToDatabase(); // Ensure you have this line correctly
    const listingsCollection = db.collection("listings");

    if (!listingsCollection) {
      throw new Error("Listings collection not found");
    }

    const listings = await listingsCollection.find({}).toArray();

    return new Response(JSON.stringify(listings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return new Response("Error fetching listings", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const db = await connectToDatabase();
    const listingsCollection = db.collection("listings");

    const body = await req.json(); // Get the request body

    // Insert a new listing into the collection
    const newListing = await listingsCollection.insertOne(body);

    // Return the newly created listing
    return new Response(JSON.stringify(newListing.ops[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    return new Response("Error creating listing", { status: 500 });
  }
}
