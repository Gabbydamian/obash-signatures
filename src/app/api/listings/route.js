import cloudinary from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/dbConnect";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request) {
  try {
    const db = await connectToDatabase();
    const listingsCollection = db.collection("listings");

    if (!listingsCollection) {
      throw new Error("Listings collection not found");
    }

    const listings = await listingsCollection.find({}).toArray();

    return NextResponse.json(listings, { status: 200 });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { error: "Error fetching listings" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Get form data from the request body
    const {
      address,
      city,
      price,
      details,
      zipCode,
      type,
      description,
      images,
    } = await req.json(); // Use await req.json() to parse the body

    // Connect to MongoDB
    const db = await connectToDatabase();

    // Find the first document to retrieve the current listings
    const existingDocument = await db.collection("listings").findOne({});

    // Calculate the new listing ID
    const newListingId =
      existingDocument && existingDocument.listings
        ? uuidv4().toString()
        : uuidv4().toString(); // If no listings exist, set ID to 0

    // Create the new listing object with the calculated ID
    const newListing = {
      id: newListingId,
      address,
      city,
      price,
      details,
      zipCode,
      type,
      description,
      images, // This now contains Cloudinary URLs
    };

    // Update the first document by pushing the new listing into the listings array
    const result = await db.collection("listings").updateOne(
      {}, // Find the first document
      {
        $push: {
          listings: newListing,
        },
      }
    );

    // Check if a document was modified
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "No document found to update" },
        { status: 404 }
      ); // Handle case where no document was modified
    }

    return NextResponse.json(
      { message: "Listing added successfully", id: newListingId },
      { status: 201 }
    ); // Include the new ID in the response
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    ); // Use NextResponse
  }
}
