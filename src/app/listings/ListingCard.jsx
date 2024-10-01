// src/app/listings/ListingCard.jsx

import { Card, CardBody, Image, Stack } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";

const ListingCard = ({ item, idx }) => {
  return (
    <ChakraLink
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
    </ChakraLink>
  );
};

export default ListingCard;
