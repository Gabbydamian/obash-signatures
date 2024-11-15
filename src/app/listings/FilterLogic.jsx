// src/app/listings/FilterLogic.jsx

import {
  Select,
  Menu,
  MenuButton,
  MenuList,
  Button,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const FilterLogic = ({
  cities,
  propertyTypes,
  setFilterCity,
  setFilterType,
  setPriceRange,
  setSortOrder,
  filterCity,
  filterType,
  priceRange,
  sortOrder,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Filter by City */}
      <div className="w-full lg:max-w-[200px]">
        <Select
          placeholder="Filter by City"
          onChange={(e) => setFilterCity(e.target.value)}
          value={filterCity}
          // maxW="200px"
        >
          {cities.map((city) => (
            <option key={city.id} value={city}>
              {city}
            </option>
          ))}
        </Select>
      </div>

      {/* Filter by Property Type */}
      <Menu closeOnSelect={false}>
        <MenuButton
          className="flex items-center text-inherit w-80 bg-transparent border text-left border-gray-300 rounded-md p-3 font-[400]"
          as={Button}
          rightIcon={<ChevronDownIcon className="size-3 stroke-black stroke-[3px]" />}
        >
          Property Type
        </MenuButton>
        <MenuList>
          <CheckboxGroup
            value={filterType}
            onChange={(selectedTypes) => setFilterType(selectedTypes)}
          >
            <div className="flex flex-col gap-2 p-4">
              {propertyTypes.map((type) => (
                <Checkbox key={type.id} value={type}>
                  {type}
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        </MenuList>
      </Menu>

      {/* Filter by Price Range */}
      <div className="w-full lg:max-w-[200px]">
        <Select
          placeholder="Filter by Price"
          onChange={(e) => setPriceRange(e.target.value)}
          value={priceRange}
        >
          <option value="below-100">Below ₦100M</option>
          <option value="100-150">₦100M - ₦150M</option>
          <option value="150-200">₦150M - ₦200M</option>
          <option value="above-200">Above ₦200M</option>
        </Select>
      </div>

      {/* Sort by Price */}
      <div className="w-full lg:max-w-[200px]">
        <Select
          placeholder="Sort by Price"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </Select>
      </div>
    </div>
  );
};

export default FilterLogic;
