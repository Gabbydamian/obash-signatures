"use client";
import { useState, useEffect, Suspense } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Listings from "./Listings";

export default function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/listings");

        if (!response.ok) {
          throw new Error("Failed to fetch listings.");
        }

        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (loading) {
  //   return <p className="grid place-items-center h-full my-auto">Loading...</p>; // Show loading indicator
  // }

  if (error) {
    return <p>{error}</p>; // Show error message if any
  }

  return (
    <>
      <Nav />
      <Suspense fallback={<div>Loading listings...</div>}>
        <Listings data={data} loading={loading} />
      </Suspense>
      <Footer />
    </>
  );
}
