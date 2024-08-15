import React from "react";
import { Image, Stack, Text } from "@chakra-ui/react";

const Listing = ({ listing }) => {
  return (
    <>
      <div className="w-full">
        <Image
          width={"100%"}
          fit={"cover"}
          src={listing.images[0]}
          alt={listing.address}
          className="h-[24rem]"
        />
      </div>
      <div className="container mx-auto py-12">
        <Stack direction="column" mt={3} spacing={3}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            as={"h1"}
          >{`${listing.address}, ${listing.city}`}</Text>
          <Text>{`${listing.price}`}</Text>
          <Text>{`Details: ${listing.details}`}</Text>
        </Stack>
      </div>
    </>
  );
};

export default Listing;
