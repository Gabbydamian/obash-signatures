import { NextResponse } from "next/server";

import { connectToDatabase } from "../../../lib/mongodb";
import Listing from "../../../models/Listing";

// List of allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://obash-signatures.vercel.app",
];

// Utility function to handle CORS headers for all requests
function setCorsHeaders(response, request) {
  const origin = request.headers.get("origin");

  if (allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
  } else {
    // Instead of setting to "null", we'll use a wildcard as a fallback
    response.headers.set("Access-Control-Allow-Origin", "*");
  }

  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

// GET: Fetch all listings
export async function GET(request) {
  console.log("GET request received");
  console.log("Origin:", request.headers.get("origin"));

  try {
    await connectToDatabase();
    const listings = await Listing.find({});
    let response = NextResponse.json(listings, { status: 200 });
    const corsResponse = setCorsHeaders(response, request);
    console.log(
      "Response headers:",
      Object.fromEntries(corsResponse.headers.entries())
    );
    return corsResponse;
  } catch (error) {
    console.error("Error:", error);
    let response = NextResponse.json(
      { error: "Error fetching listings" },
      { status: 500 }
    );
    return setCorsHeaders(response, request);
  }
}

// POST: Add a new listing
export async function POST(request) {
  console.log("POST request received");
  try {
    await connectToDatabase();
    const body = await request.json();
    const newListing = new Listing(body);
    await newListing.save();
    let response = NextResponse.json(newListing, { status: 201 });
    return setCorsHeaders(response, request);
  } catch (error) {
    console.error("Error creating listing:", error);
    let response = NextResponse.json(
      { error: "Error creating listing" },
      { status: 500 }
    );
    return setCorsHeaders(response, request);
  }
}

// OPTIONS: Handle preflight requests
export function OPTIONS(request) {
  console.log("OPTIONS request received");
  const origin = request.headers.get("origin");

  // Respond to the OPTIONS request
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
        ? origin
        : "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "86400",
    },
  });
}
