import React from "react";
import LocationCard from "./LocationCard";

const FeaturedLocations = () => {
  return (
    <div className="">
      <div className="container mx-auto px-6 flex flex-col items-center md:justify-center gap-8 md:flex-row md:gap-4 py-12">
        <LocationCard
          href="/listings?search=lagos"
          imgSrc="https://images.unsplash.com/photo-1605146768851-eda79da39897?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          imgAlt="Building with glass facade and green trees"
          title="Find Homes in Lagos"
        />
        <LocationCard
          href="/listings?search=abuja"
          imgSrc="https://plus.unsplash.com/premium_photo-1694475043212-449032bdd54c?q=80&w=1458&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          imgAlt="House with pool and garden"
          title="Find Homes in Abuja"
        />
        <LocationCard
          href="/listings?search=ibadan"
          imgSrc="https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          imgAlt="Side view of a house with a pool"
          title="Find Homes in Ibadan"
        />
      </div>
    </div>
  );
};

export default FeaturedLocations;
