// app/admin/listings/[id]/ListingDetails.js
"use client";
import React from "react";
import { Image, Stack, Text, Button, Spinner } from "@chakra-ui/react";

const ListingDetails = ({ listing, params }) => {
  const { id } = params;

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
