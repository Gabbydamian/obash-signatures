import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Main = () => {
  return (
    <div className="container mx-auto px-4 md:px-0 flex flex-col">
      <h1 className="text-5xl md:text-6xl font-[700] mt-24 md:mt-36">Find Your Dream Home</h1>
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
          placeholder="Search for homes by address, city or ZIP code"
          className="w-full md:w-1/2 px-10 py-6 md:py-8 font-[500] md:font-[700] border-2 border-black hover:border-black focus:border-black bg-[#bebebe44] text-md md:text-lg"
          _placeholder={{ color: "#000", fontWeight: "500" }}
        />
      </InputGroup>
    </div>
  );
};

export default Main;
