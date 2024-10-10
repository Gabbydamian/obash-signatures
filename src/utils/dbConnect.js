// src/utils/dbConnect.js

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI; // Ensure this contains your connection string
let client = null;

// Function to connect to the database
export async function connectToDatabase() {
  try {
    // Create a MongoClient with a MongoClientOptions object
    if (!client) {
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
        connectTimeoutMS: 50000,
      });
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Connected to MongoDB successfully!");
    }

    return client.db(); // Return the database instance
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Could not connect to the database.");
  }
}
