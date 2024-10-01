"use client";
import react, { useState, useEffect } from "react";
import AdminListingCard from "./AdminListingCard";
import { Spinner, Link as ChakraLink } from "@chakra-ui/react";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const AdminMain = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

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
    <div className="flex flex-col py-16 items-center md:justify-center gap-4 md:flex-row md:flex-wrap md:gap-4">
      {data.length > 0 ? (
        data.map((item, idx) => (
          <AdminListingCard key={idx} item={item} idx={idx} />
        ))
      ) : loading ? (
        <div className="grid place-items-center h-full my-auto">
          <Spinner size="xl" thickness="4px" />
        </div>
      ) : error ? (
        <div className="grid place-items-center h-full my-auto mt-10">
          <p className="text-md max-w-lg text-balance text-center leading-relaxed text-red-500 flex flex-col items-center">
            Error loading properties. Please check your network settings and
            reload the page or contact the administrator
            {console.log(error)}
            <br />
            <ChakraLink
              href="/"
              className="text-center text-blue-500 underline mt-4"
            >
              Back to Home
            </ChakraLink>
          </p>
        </div>
      ) : (
        data.map((item, idx) => (
          <AdminListingCard key={idx} item={item} idx={idx} />
        ))
      )}
    </div>
  );
};

export default AdminMain;
