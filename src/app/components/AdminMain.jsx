"use client";
import react, { useState, useEffect } from "react";
import { useListings } from "@/context/ListingsContext";
import AdminListingCard from "./AdminListingCard";
import { Spinner, Link as ChakraLink } from "@chakra-ui/react";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const AdminMain = () => {
  const { listings, loading, error } = useListings();
  const data = listings;

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
