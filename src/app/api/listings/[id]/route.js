// src/app/api/listings/[id]/route.js

import { listings } from "../route"; // Import listings from the main route

// Handle GET requests to fetch individual listings
export async function GET(req, { params }) {
  const { id } = params; // Extract the id from the URL params

  const listing = listings.find((listing) => listing.id == id);
  if (!listing) {
    return new Response(JSON.stringify({ message: "Listing not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(listing), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Handle PUT requests to update individual listings
export async function PUT(req, { params }) {
  const { id } = params;
  const updatedData = await req.json();

  const listingIndex = listings.findIndex((listing) => listing.id === id);
  if (listingIndex === -1) {
    return new Response(JSON.stringify({ message: "Listing not found" }), {
      status: 404,
    });
  }

  // Update the listing with new data
  listings[listingIndex] = { ...listings[listingIndex], ...updatedData };

  return new Response(JSON.stringify(listings[listingIndex]), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
