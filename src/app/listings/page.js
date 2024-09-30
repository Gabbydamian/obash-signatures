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
          `https://obash-api.vercel.app/api/listings/`,
          {
            method: "GET",
            credentials: "include", // Add this line
            headers: {
              "Content-Type": "application/json",
              // Add any other necessary headers here
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Raw API response:", result); // Log the raw response

        // Check the structure of the response
        const listings = Array.isArray(result) ? result : result.listings || [];
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
