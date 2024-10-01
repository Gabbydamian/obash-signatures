"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {Link as ChakraLink, Spinner } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import FilterLogic from "./FilterLogic";
import ListingCard from "./ListingCard";
import Pagination from "./Pagination";

const Listings = ({ data, loading, error }) => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterType, setFilterType] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const cities = useMemo(
    () => [...new Set(data.map((item) => item.city))],
    [data]
  );
  const propertyTypes = useMemo(
    () => [...new Set(data.map((item) => item.type))],
    [data]
  );

  const filteredData = useMemo(() => {
    let filtered = data;

    if (filterCity) {
      filtered = filtered.filter((item) => item.city === filterCity);
    }

    if (filterType.length > 0) {
      filtered = filtered.filter((item) => filterType.includes(item.type));
    }

    if (priceRange) {
      filtered = filtered.filter((item) => {
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
    }

    filtered = filtered.filter((item) => {
      const searchLower = debouncedSearchQuery.toLowerCase();
      return (
        item.city.toLowerCase().includes(searchLower) ||
        item.type.toLowerCase().includes(searchLower) ||
        item.address.toLowerCase().includes(searchLower) ||
        item.details.toLowerCase().includes(searchLower)
      );
    });

    if (sortOrder) {
      filtered.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/₦|,/g, ""));
        const priceB = parseInt(b.price.replace(/₦|,/g, ""));
        return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
      });
    }

    return filtered;
  }, [
    data,
    filterCity,
    filterType,
    priceRange,
    debouncedSearchQuery,
    sortOrder,
  ]);

  const itemsPerPage = 12;
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const setFilterCityCallback = useCallback((city) => setFilterCity(city), []);
  const setFilterTypeCallback = useCallback(
    (types) => setFilterType(types),
    []
  );
  const setPriceRangeCallback = useCallback(
    (range) => setPriceRange(range),
    []
  );
  const setSortOrderCallback = useCallback((order) => setSortOrder(order), []);
  const setCurrentPageCallback = useCallback(
    (page) => setCurrentPage(page),
    []
  );

  return (
    <div className="container flex flex-col items-center mx-auto py-12">
      <FilterLogic
        cities={cities}
        propertyTypes={propertyTypes}
        setFilterCity={setFilterCityCallback}
        setFilterType={setFilterTypeCallback}
        setPriceRange={setPriceRangeCallback}
        setSortOrder={setSortOrderCallback}
        filterCity={filterCity}
        filterType={filterType}
        priceRange={priceRange}
        sortOrder={sortOrder}
      />
      <div className="flex flex-col items-center md:justify-center gap-8 md:flex-row md:flex-wrap md:gap-4">
        {paginatedData.length > 0 ? (
          paginatedData.map((item, idx) => (
            <ListingCard key={idx} item={item} idx={idx} />
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
      <Pagination
        totalItems={filteredData.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPageCallback}
      />
    </div>
  );
};

export default Listings;
