// src/utils/dbConnect.js

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI; // Ensure this contains your connection string

// Global is used to maintain a cached connection in development.
let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to store the client
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      connectTimeoutMS: 50000,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    connectTimeoutMS: 50000,
  });
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  try {
    // Await the clientPromise to get the connected client
    const client = await clientPromise;

    // Send a ping to confirm a successful connection (optional, for debugging)
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB successfully!");

    return client.db(); // Return the default database instance
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Could not connect to the database.");
  }
}
