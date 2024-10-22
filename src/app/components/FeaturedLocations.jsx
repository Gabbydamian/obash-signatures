import React from "react";
import LocationCard from "./LocationCard";

const FeaturedLocations = () => {
  return (
    <div className="">
      <div className="container mx-auto px-6 flex flex-col items-center md:justify-center gap-8 md:flex-row md:gap-4 py-12">
        <LocationCard
          href="/listings?search=lagos"
          imgSrc="/images/01.jpg"
          imgAlt="Building with glass facade and green trees"
          title="Find Homes in Lagos"
        />
        <LocationCard
          href="/listings?search=abuja"
          imgSrc="/images/02.jpg"
          imgAlt="House with pool and garden"
          title="Find Homes in Abuja"
        />
        <LocationCard
          href="/listings?search=ibadan"
          imgSrc="/images/03.jpg"
          title="Find Homes in Ibadan"
        />
      </div>
    </div>
  );
};

export default FeaturedLocations;
