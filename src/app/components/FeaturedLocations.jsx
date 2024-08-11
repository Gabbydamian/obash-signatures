import { Card, CardBody, Image, Stack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

const FeaturedLocations = () => {
  return (
    <div className="">
      <div className="container mx-auto flex gap-4 py-12">
        <Link
          href="/listings"
          className="filter grayscale-[0.5] no-underline hover:filter-none transition-all duration-300 ease-in-out"
        >
          <Card maxW="xs">
            <CardBody>
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Stack direction="row" mt={3}>
                <h2 className="font-bold text-2xl text-center mx-auto no-underline">
                  Find Homes in London
                </h2>
              </Stack>
            </CardBody>
          </Card>
        </Link>
        <Link
          href="/listings"
          className="filter grayscale-[0.5] no-underline hover:filter-none transition-all duration-300 ease-in-out"
        >
          <Card maxW="xs">
            <CardBody>
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Stack direction="row" mt={3}>
                <h2 className="font-bold text-2xl text-center mx-auto no-underline">
                  Find Homes in Manchester
                </h2>
              </Stack>
            </CardBody>
          </Card>
        </Link>
        <Link
          href="/listings"
          className="filter grayscale-[0.5] no-underline hover:filter-none transition-all duration-300 ease-in-out"
        >
          <Card maxW="xs">
            <CardBody>
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Stack direction="row" mt={3}>
                <h2 className="font-bold text-2xl text-center mx-auto no-underline">
                  Find Homes in Norwich
                </h2>
              </Stack>
            </CardBody>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedLocations;
