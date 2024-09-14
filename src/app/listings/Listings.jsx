"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Select, Button, Link as ChakraLink, Spinner } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import FilterLogic from "./FilterLogic";
import ListingCard from "./ListingCard";
import Pagination from "./Pagination";

const Listings = ({ data, loading }) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || ""; // Ensure default empty string

  const [filterCity, setFilterCity] = useState("");
  const [filterType, setFilterType] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Handle debounced search query
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // Debounce by 300ms
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Available filter options
  const cities = useMemo(
    () => [...new Set(data.map((item) => item.city))],
    [data]
  );
  const propertyTypes = useMemo(
    () => [...new Set(data.map((item) => item.type))],
    [data]
  );

  // Filter logic broken into smaller functions for better performance
  const filteredByCity = useMemo(() => {
    return filterCity ? data.filter((item) => item.city === filterCity) : data;
  }, [data, filterCity]);

  const filteredByType = useMemo(() => {
    return filterType.length > 0
      ? filteredByCity.filter((item) => filterType.includes(item.type))
      : filteredByCity;
  }, [filteredByCity, filterType]);

  const filteredByPriceRange = useMemo(() => {
    if (!priceRange) return filteredByType;
    return filteredByType.filter((item) => {
      const price = parseInt(item.price.replace(/₦|,/g, ""));
      switch (priceRange) {
        case "below-100":
          return price < 100000000;
        case "100-150":
          return price >= 100000000 && price <= 150000000;
        case "150-200":
          return price > 150000000 && price <= 200000000;
        case "above-200":
          return price > 200000000;
        default:
          return true;
      }
    });
  }, [filteredByType, priceRange]);

  const filteredData = useMemo(() => {
    return filteredByPriceRange
      .filter((item) => {
        const searchLower = debouncedSearchQuery.toLowerCase();
        return (
          item.city.toLowerCase().includes(searchLower) ||
          item.type.toLowerCase().includes(searchLower) ||
          item.address.toLowerCase().includes(searchLower) ||
          item.details.toLowerCase().includes(searchLower)
        );
      })
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return (
            parseInt(a.price.replace(/₦|,/g, "")) -
            parseInt(b.price.replace(/₦|,/g, ""))
          );
        } else if (sortOrder === "desc") {
          return (
            parseInt(b.price.replace(/₦|,/g, "")) -
            parseInt(a.price.replace(/₦|,/g, ""))
          );
        }
        return 0;
      });
  }, [filteredByPriceRange, debouncedSearchQuery, sortOrder]);

  // Pagination logic
  const itemsPerPage = 12;
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  return (
    <div className="container flex flex-col items-center mx-auto py-12">
      {/* Filter and Sort Controls */}
      <FilterLogic
        cities={cities}
        propertyTypes={propertyTypes}
        setFilterCity={setFilterCity}
        setFilterType={setFilterType}
        setPriceRange={setPriceRange}
        setSortOrder={setSortOrder}
        filterCity={filterCity}
        filterType={filterType}
        priceRange={priceRange}
        sortOrder={sortOrder}
      />

      {/* Listings */}
      <div className="flex flex-col items-center md:justify-center gap-8 md:flex-row md:flex-wrap md:gap-4">
        {paginatedData.length > 0 ? (
          paginatedData.map((item, idx) => (
            <ListingCard key={idx} item={item} idx={idx} />
          ))
        ) : loading ? (
          <div className="grid place-items-center h-full my-auto">
            <Spinner size="xl" thickness="4px" />
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

      {/* Pagination */}
      <Pagination
        totalItems={filteredData.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Listings;
