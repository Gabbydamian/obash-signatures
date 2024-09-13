"use client";
import { useState, useMemo } from "react";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Select,
  CheckboxGroup,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// import { ChevronDownIcon } from "@chakra-ui/icons";

const Listings = ({ data }) => {
  const [filterCity, setFilterCity] = useState("");
  const [filterType, setFilterType] = useState([]); // Now an array to support multiple types
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"
  const [priceRange, setPriceRange] = useState("");

  // Extract unique cities and property types from data
  const cities = useMemo(
    () => [...new Set(data.map((item) => item.city))],
    [data]
  );
  const propertyTypes = useMemo(
    () => [...new Set(data.map((item) => item.type))],
    [data]
  );

  // Handle filtering by city
  const handleFilterCity = (e) => {
    setFilterCity(e.target.value);
  };

  // Handle sorting
  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
  };

  // Handle price range filtering
  const handlePriceRange = (e) => {
    setPriceRange(e.target.value);
  };

  // Filter and sort the data
  const filteredData = data
    .filter((item) => (filterCity ? item.city === filterCity : true))
    .filter((item) =>
      filterType.length > 0 ? filterType.includes(item.type) : true
    ) // Adjusted to check for multiple types
    .filter((item) => {
      if (!priceRange) return true;
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

  return (
    <div className="container flex flex-col items-center mx-auto py-12">
      {/* Filter and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Filter by City */}
        <Select
          placeholder="Filter by City"
          onChange={handleFilterCity}
          maxW="200px"
        >
          {cities.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </Select>

        {/* Multi-Select Filter for Property Type in Dropdown */}
        <Menu closeOnSelect={false}>
          <MenuButton
            className="flex items-center w-80 bg-transparent border border-gray-300 rounded-md p-2 font-[500]"
            as={Button}
            rightIcon={<ChevronDownIcon className="size-4" />}
          >
            Filter by Property Type
          </MenuButton>
          <MenuList>
            <CheckboxGroup
              value={filterType}
              onChange={(selectedTypes) => setFilterType(selectedTypes)}
            >
              <div className="flex flex-col gap-2 p-4">
                {propertyTypes.map((type, idx) => (
                  <Checkbox key={idx} value={type}>
                    {type}
                  </Checkbox>
                ))}
              </div>
            </CheckboxGroup>
          </MenuList>
        </Menu>

        {/* Filter by Price Range */}
        <Select
          placeholder="Filter by Price"
          onChange={handlePriceRange}
          maxW="200px"
        >
          <option value="below-100">Below ₦100M</option>
          <option value="100-150">₦100M - ₦150M</option>
          <option value="150-200">₦150M - ₦200M</option>
          <option value="above-200">Above ₦200M</option>
        </Select>

        {/* Sort by Price */}
        <Select
          placeholder="Sort by Price"
          onChange={handleSortOrder}
          maxW="200px"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </Select>
      </div>

      {/* Listings */}
      <div className="flex flex-col items-center md:justify-center gap-8 md:flex-row md:flex-wrap md:gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((item, idx) => (
            <Link
              key={idx}
              href={`/listings/${idx}`}
              className="min-h-[350px] filter grayscale-[0.5] hover:no-underline hover:scale-[.99] border rounded-md border-gray-200 hover:filter-none transition-all duration-300 ease-in-out"
            >
              <Card maxW="xs" className="min-h-[350px]">
                <CardBody>
                  <Image
                    aspectRatio={3 / 2}
                    fit={"cover"}
                    src={item.images[0]}
                    alt={item.address}
                    borderRadius="lg"
                  />
                  <Stack direction="column" mt={"5"}>
                    <p className="text-sm text-center font-bold">{`${item.type}, ${item.details}`}</p>
                    <p className="text-sm text-center">{`${item.address}, ${item.city}`}</p>
                    <p className="text-md text-center font-bold">{`${item.price}`}</p>
                  </Stack>
                </CardBody>
              </Card>
            </Link>
          ))
        ) : (
          <p>No listings match your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Listings;
