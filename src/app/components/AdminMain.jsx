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
          <p className="text-md text-red-500 flex flex-col items-center">
            {error}. Please Reload the page or contact the administrator <br />
            <ChakraLink
              href="/"
              className="text-center text-blue-500 underline mt-4"
            >
              Back to Home
            </ChakraLink>
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 mt-10">
          <p>No listings match your criteria</p>
          <ChakraLink
            href="/listings"
            className="text-blue-700 underline flex gap-2 items-center"
          >
            <ArrowLeftIcon className="size-4" /> View all listings
          </ChakraLink>
        </div>
      )}
    </div>
  );
};

export default AdminMain;
