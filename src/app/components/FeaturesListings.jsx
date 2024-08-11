"use client";
import { useState } from "react";
import { Image, Link } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const Carousel = () => {
  const images = [
    "https://images.unsplash.com/photo-1605146768851-eda79da39897?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1694475043212-449032bdd54c?q=80&w=1458&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  return (
    <div className="relative carousel w-full flex flex-col justify-center mt-4">
      <Link
        href="#"
        className="w-full grayscale-[0.3] hover:scale-[.99] hover:filter-none transition-all ease-in-out duration-300"
      >
        <Image
          src={images[currentImage]}
          height={500}
          className="object-cover w-full"
          alt="Carousel Image"
        />
      </Link>
      <div className="controls flex justify-between">
        <button
          className="absolute top-0 left-0 p-3 bg-black opacity-50 h-full transition-all ease-in-out"
          onClick={handlePrev}
        >
          <ArrowLeftIcon className="size-6 stoke-2" />
        </button>
        <button
          className="absolute top-0 right-0 p-3 bg-black opacity-50 h-full transition-all ease-in-out"
          onClick={handleNext}
        >
          <ArrowRightIcon className="size-6 stoke-2" />
        </button>
      </div>
    </div>
  );
};

const FeaturesListings = () => {
  return (
    <div className="bg-[#121417]">
      <div className="container mx-auto flex flex-col text-[#F4F7F5] py-16">
        <h2 className="font-[500] text-center text-3xl">
          View our Collection of <br />{" "}
          <span className="uppercase text-5xl leading-[1.5]">
            Featured Properties
          </span>
        </h2>
        <Carousel />
      </div>
    </div>
  );
};

export default FeaturesListings;
