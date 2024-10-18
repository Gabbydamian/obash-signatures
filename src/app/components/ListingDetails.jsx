// app/admin/listings/[id]/ListingDetails.js
"use client";
import React, { useState } from "react";
import { Image, Stack, Text, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const ListingDetails = ({ listing, params }) => {
  const { id } = params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track the current image index

  // Function to go to the next image
  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % listing.images.length
    );
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <div className="w-full h-[24rem] relative overflow-hidden">
        {/* Image Carousel */}
        <Image
          width={"100%"}
          height={400} // Set height for consistency
          fit={"cover"}
          src={listing.images[currentImageIndex]} // Use the current image index
          alt={listing.address}
          className="h-[24rem] transition-transform duration-500 ease-in-out"
        />

        {/* Left and Right Arrows */}
        <Button
          onClick={prevImage}
          className="absolute left-0 top-1/2 h-full transform -translate-y-1/2 text-white bg-black p-2 px-3  opacity-75 hover:opacity-90 hover:bg-black transition-opacity rounded-none"
        >
          <ChevronLeftIcon className="size-6" />
        </Button>
        <Button
          onClick={nextImage}
          className="absolute right-0 top-1/2 h-full transform -translate-y-1/2 text-white bg-black p-2 px-3  opacity-75 hover:bg-black hover:opacity-90 transition-opacity rounded-none"
        >
          <ChevronRightIcon className="size-6" />
        </Button>
      </div>

      <div className="container mx-auto py-4 lg:px-16 px-4 mb-12">
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
            ₦ {listing.price}
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
