// src/app/api/listings/[id]/route.js
import { connectToDatabase } from "@/utils/dbConnect";
import { ObjectId } from "mongodb";

// GET listing by ID
export async function GET(req, { params }) {
  try {
    const db = await connectToDatabase();
    const listingsCollection = db.collection("listings");

    // Assuming there is only one document that holds all listings
    const listingDoc = await listingsCollection.findOne({}); // Or filter by specific criteria

    if (!listingDoc || !listingDoc.listings) {
      return new Response("No listings available", { status: 404 });
    }

    const listings = listingDoc.listings;
    const listing = listings.find((listing) => listing.id == params.id); // Match your ID field here

    if (listing) {
      return new Response(JSON.stringify(listing), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response("Listing not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching listing:", error);
    return new Response("Error fetching listing", { status: 500 });
  }
}

// DElete Listing
export async function DELETE(req, {params}) {
  try {
    const db = await connectToDatabase();
    const listingsCollection = db.collection("listings");

    // Assuming there is only one document that holds all listings
    const listingDoc = await listingsCollection.findOne({}); // Or filter by specific criteria

    if (!listingDoc || !listingDoc.listings) {
      return new Response("No listings available", { status: 404 });
    }

    const listings = listingDoc.listings;
    const listingIndex = listings.findIndex((listing) => listing.id == params.id); // Match your ID field here

    if (listingIndex !== -1) {
      listings.splice(listingIndex, 1); // Remove the listing from the array

      // Update the document with the new listings array
      await listingsCollection.updateOne(
        { _id: listingDoc._id },
        { $set: { listings: listings } }
      );

      return new Response("Listing deleted successfully", { status: 200 });
    } else {
      return new Response("Listing not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting listing:", error);
    return new Response("Error deleting listing", { status: 500 });
  }
}


// Update Listing
export async function PUT(req, {params}) {
  try {
    const db = await connectToDatabase();
    const listingsCollection = db.collection("listings");

    const listingDoc = await listingsCollection.findOne({}); // Or filter by specific criteria

    if (!listingDoc || !listingDoc.listings) {
      return new Response("No listings available", { status: 404 });
    }

    const listings = listingDoc.listings;
    const listingIndex = listings.findIndex((listing) => listing.id == params.id); // Match your ID field here

    if (listingIndex !== -1) {
      const updatedData = await req.json(); // Assuming the updated data is in the request body

      // Update the listing with the new data
      listings[listingIndex] = { ...listings[listingIndex], ...updatedData };

      // Update the document with the new listings array
      await listingsCollection.updateOne(
      { _id: listingDoc._id },
      { $set: { listings: listings } }
      );

      return new Response(JSON.stringify(listings[listingIndex]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response("Listing not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error updating listing:", error);
    return new Response("Error updating listing", { status: 500 });
  }
}