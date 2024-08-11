import { Card, CardBody, Image, Stack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

const FeaturedLocations = () => {
  return (
    <div className="">
      <div className="container mx-auto flex gap-4 py-12">
        <Link
          href="/listings"
          className="filter grayscale-[0.5] hover:no-underline hover:scale-[.99] border rounded-md border-gray-200 hover:filter-none transition-all duration-300 ease-in-out"
        >
          <Card maxW="xs">
            <CardBody>
              <Image
                aspectRatio={3 / 2}
                src="https://images.unsplash.com/photo-1605146768851-eda79da39897?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Building with glass facade and green trees"
                borderRadius="lg"
              />
              <Stack direction="row" mt={3}>
                <h2 className="font-bold text-2xl text-center mx-auto ">
                  Find Homes in London
                </h2>
              </Stack>
            </CardBody>
          </Card>
        </Link>
        <Link
          href="/listings"
          className="filter grayscale-[0.5] hover:no-underline hover:scale-[.99] border rounded-md border-gray-200 hover:filter-none transition-all duration-300 ease-in-out"
        >
          <Card maxW="xs">
            <CardBody>
              <Image
                aspectRatio={3 / 2}
                src="https://plus.unsplash.com/premium_photo-1694475043212-449032bdd54c?q=80&w=1458&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="House with pool and garden"
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
          className="filter grayscale-[0.5] hover:no-underline hover:scale-[.99] border rounded-md border-gray-200 hover:filter-none transition-all duration-300 ease-in-out"
        >
          <Card maxW="xs">
            <CardBody>
              <Image
                aspectRatio={3 / 2}
                src="https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Side view of a house with a pool"
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
