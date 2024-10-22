import React from "react";
import { Card, CardBody, Image, Stack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

const LocationCard = ({ href, imgSrc, imgAlt, title }) => {
  return (
    <Link
      href={href}
      className="filter-none md:filter md:grayscale-[0.5] hover:no-underline hover:scale-[.99] border rounded-md border-gray-200 hover:filter-none transition-all duration-300 ease-in-out"
    >
      <Card maxW="xs">
        <CardBody>
          <Image
            aspectRatio={3 / 2}
            src={imgSrc}
            alt={imgAlt}
            borderRadius="lg"
          />
          <Stack direction="row" mt={3}>
            <h2 className="font-bold text-2xl text-center mx-auto no-underline">
              {title}
            </h2>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
};

export default LocationCard;
