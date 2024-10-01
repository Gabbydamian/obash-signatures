"use client";
import { useState, useEffect, Suspense } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Listings from "./Listings";
import baseUrl from "../../utils/getUrl";

export default function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://obash-express-api.vercel.app/api/listings`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              credentials: "include",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Raw API response:", result); // Log the raw response

        // Check the structure of the response
        const listing = Array.isArray(result) ? result : result.listings || [];
        const listings = listing[0]?.listings || [];
        setData(listings);
        console.log("Processed listings:", listings);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Nav />
      <Suspense fallback={<div>Loading listings...</div>}>
        <Listings data={data} loading={loading} error={error} />
      </Suspense>
      <Footer />
    </>
  );
}
