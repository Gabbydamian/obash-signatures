// app/admin/listings/[id]/ListingDetails.js

"use client"; // Mark this component to run on the client

import React, { useEffect, useState } from "react";
import { Image, Stack, Text, Button, Spinner } from "@chakra-ui/react";
import baseUrl from "../../utils/getUrl";

const ListingDetails = ({ params }) => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = params;

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/listings`);
        if (!response.ok) {
          throw new Error("Failed to fetch listing details.");
        }
        const data = await response.json();

        // Assuming listings are stored inside data[0].listings
        const foundListing = data[0]?.listings.find((item) => item.id === id);
        if (!foundListing) {
          throw new Error("Listing not found.");
        }

        setListing(foundListing);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading)
    return (
      <div className="grid place-items-center h-full my-auto">
        <Spinner size="xl" thickness="4px" />
      </div>
    );
  if (error) return <Text color="red.500">Error: {error}</Text>;

  return (
    <div>
      <div className="w-full h-[24rem] overflow-hidden">
        <Image
          width={"100%"}
          fit={"cover"}
          src={listing.images[0]}
          alt={listing.address}
          className="h-[24rem] transition-transform duration-500 ease-in-out"
        />
      </div>
      <div className="container mx-auto py-4 lg:px-16 mb-12">
        <Stack direction="column" mt={3} spacing={3}>
          <Text as={"h2"} className="text-3xl font-bold uppercase">
            {listing.address}
          </Text>
          <Text as={"h3"} className="text-xl font-semibold text-gray-900">
            {`${listing.address}, ${listing.city}, ${listing.city
              .slice(0, 3)
              .toUpperCase()} ${listing.zipCode}`}
          </Text>
          <hr className="border-gray-900" />
          <Text as={"h3"} className="text-2xl font-semibold text-gray-900">
            {listing.price}
          </Text>
          <Text as={"p"} className=" text-justify">
            {listing.description
              ? listing.description
              : `This stunning property located in the prestigious Victoria Island area of Lagos offers a perfect blend of luxury and convenience...`}
          </Text>
          <Text as={"h3"} className="text-xl text-gray-900 font-semibold">
            {listing.details}
          </Text>
        </Stack>
        <Stack
          direction={"column"}
          mt={10}
          spacing={3}
          className="w-2/3 mx-auto"
        >
          <Button
            colorScheme="teal"
            onClick={() => {
              window.location.href = `/admin/listings/${id}/edit`;
            }}
          >
            Edit Listing
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default ListingDetails;
