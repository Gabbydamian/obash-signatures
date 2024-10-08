"use client";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Main = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/listings?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="container mx-auto px-6 xl:px-16 flex flex-col">
      <h1 className="text-5xl md:text-6xl xl:text-7xl font-[700] mt-24 xl:mt-32 md:mt-36">
        Find Your Dream Home
      </h1>
      <p className="text-md md:text-xl mt-2 font-[500]">
        Explore our listings to discover{" "}
        <span className="highlight">homes that fit your needs.</span>
      </p>
      <InputGroup className="flex items-center mt-6">
        <InputLeftElement pointerEvents="none" className="py-6 md:py-8 mt-1">
          <MagnifyingGlassIcon className="size-6" />
        </InputLeftElement>
        <Input
          type="text"
          focusBorderColor="#000"
          _focus={{ borderWidth: "2px" }}
          placeholder="Search for homes by address, city, type, or price"
          className="w-full md:w-1/2 px-10 py-6 md:py-8 font-[500] md:font-[700] border-2 border-black hover:border-black focus:border-black bg-[#bebebe44] text-md md:text-lg"
          _placeholder={{ color: "#000", fontWeight: "500" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch} // Trigger search on Enter
        />
      </InputGroup>
    </div>
  );
};

export default Main;
