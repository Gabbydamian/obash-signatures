// src/app/api/listings/[id]/route.js

import Listing from "../../../../models/Listing";
import connectToDatabase from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

// List of allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://obash-signatures.vercel.app",
];

// Utility function to handle CORS headers for all requests
function setCorsHeaders(response, request) {
  const origin = request.headers.get("origin");

  // Set the Access-Control-Allow-Origin header based on allowed origins
  if (allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  } else {
    response.headers.set("Access-Control-Allow-Origin", "null");
  }

  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

// GET: Fetch listing by ID
export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const listing = await Listing.findById(params.id);
    if (!listing) {
      let response = NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
      return setCorsHeaders(response, req); // Set CORS headers
    }
    let response = NextResponse.json(listing, { status: 200 });
    return setCorsHeaders(response, req); // Set CORS headers
  } catch (error) {
    let response = NextResponse.json(
      { error: "Error fetching listing" },
      { status: 500 }
    );
    return setCorsHeaders(response, req); // Set CORS headers
  }
}

// PUT: Update a listing by ID
export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const updatedListing = await Listing.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    if (!updatedListing) {
      let response = NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
      return setCorsHeaders(response, req); // Set CORS headers
    }
    let response = NextResponse.json(updatedListing, { status: 200 });
    return setCorsHeaders(response, req); // Set CORS headers
  } catch (error) {
    let response = NextResponse.json(
      { error: "Error updating listing" },
      { status: 500 }
    );
    return setCorsHeaders(response, req); // Set CORS headers
  }
}

// DELETE: Remove a listing by ID
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const deletedListing = await Listing.findByIdAndDelete(params.id);
    if (!deletedListing) {
      let response = NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
      return setCorsHeaders(response, req); // Set CORS headers
    }
    let response = NextResponse.json(
      { message: "Listing deleted successfully" },
      { status: 200 }
    );
    return setCorsHeaders(response, req); // Set CORS headers
  } catch (error) {
    let response = NextResponse.json(
      { error: "Error deleting listing" },
      { status: 500 }
    );
    return setCorsHeaders(response, req); // Set CORS headers
  }
}

// OPTIONS: Handle preflight requests
export function OPTIONS(req) {
  let response = NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
  return setCorsHeaders(response, req); // Set CORS headers
}
