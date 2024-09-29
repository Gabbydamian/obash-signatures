"use client";
import { useState, useEffect, Suspense } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Listings from "./Listings";
import baseUrl from "../../utils/getUrl";

export default function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/listings`);

        if (!response.ok) {
          throw new Error("Failed to fetch listings.");
        }

        const data = await response.json();
        const listings = data[0]?.listings || [];
        setData(listings);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {}
      <Nav />
      <Suspense fallback={<div>Loading listings...</div>}>
        <Listings data={data} loading={loading} error={error} />
      </Suspense>
      <Footer />
    </>
  );
}
