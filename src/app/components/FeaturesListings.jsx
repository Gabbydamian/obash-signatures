"use client";
import { useState } from "react";
import { Image } from "@chakra-ui/react"; // Ensure you use Chakra Image if needed
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useListings } from "@/context/ListingsContext";
import Link from "next/link"; // Use Next.js Link for client-side navigation

const Carousel = () => {
  const { listings, loading, error } = useListings();

  const data = listings.slice(0, 3);

  const [currentListing, setCurrentListing] = useState(0);

  const handleNext = () => {
    setCurrentListing((prevListing) => (prevListing + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentListing((prevListing) =>
      prevListing === 0 ? data.length - 1 : prevListing - 1
    );
  };

  return (
    <div className="relative carousel w-full flex flex-col justify-center mt-4">
      <Image
        src={data[currentListing]?.images?.[0]}
        height="500px" // Chakra-specific prop for height
        className="object-cover w-full grayscale-[0.5] hover:filter-none transition-all ease-in-out duration-300"
        alt="Carousel Image"
      />
      <Link
        href={`/listings/${data[currentListing]?.id}`}
        className="relative w-full"
      >
        <div className="absolute bottom-0 p-4 left-0 pl-16 bg-black bg-opacity-90 text-white hover:pr-6 md:hover:pr-12 hover:bg-opacity-75 transition-all duration-300 ease-in-out">
          <h3 className="text-[1.5rem] md:text-[2.5rem]">
            {data[currentListing]?.address}, {data[currentListing]?.city}
          </h3>
          <p className="text-lg font-[300] md:text-xl md:font-[400]">
            {data[currentListing]?.details}
          </p>
          <h4 className="text-2xl mt-1 md:text-3xl md:mt-4">
            {data[currentListing]?.price}
          </h4>
        </div>
      </Link>
      <div className="controls flex justify-between">
        <button
          className="absolute top-0 left-0 p-3 bg-black bg-opacity-50 h-full transition-all ease-in-out"
          onClick={handlePrev}
        >
          <ArrowLeftIcon className="w-6 h-6 stroke-2" />
        </button>
        <button
          className="absolute top-0 right-0 p-3 bg-black bg-opacity-50 h-full transition-all ease-in-out"
          onClick={handleNext}
        >
          <ArrowRightIcon className="w-6 h-6 stroke-2" />
        </button>
      </div>
    </div>
  );
};

const FeaturesListings = () => {
  return (
    <div className="bg-[#121417]">
      <div className="container mx-auto flex flex-col text-[#F4F7F5] py-10 md:py-16">
        <h2 className="font-[500] text-center text-xl md:text-3xl">
          View our Collection of <br />{" "}
          <span className="uppercase text-3xl md:text-5xl leading-[1.5]">
            Featured Properties
          </span>
        </h2>
        <Carousel />
      </div>
    </div>
  );
};

export default FeaturesListings;
