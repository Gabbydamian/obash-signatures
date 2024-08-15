import { Card, CardBody, Image, Stack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

const Listings = ({ data }) => {
  return (
    <div className="">
      <div className="container mx-auto flex flex-col items-center md:justify-center gap-8 md:flex-row md:flex-wrap md:gap-4 py-12">
        {data.map((item, idx) => (
          <Link
            key={idx}
            href={`/listings/${idx}`}
            className="min-h-[294px] filter grayscale-[0.5] hover:no-underline hover:scale-[.99] border rounded-md border-gray-200 hover:filter-none transition-all duration-300 ease-in-out"
          >
            <Card maxW="xs" className="min-h-[294px]">
              <CardBody>
                <Image
                  aspectRatio={3 / 2}
                  fit={"cover"}
                  src={item.images[0]}
                  alt={item.addresss}
                  borderRadius="lg"
                />
                <Stack direction="row" mt={3}>
                  <p className="text-lg text-center mx-auto ">
                    {`${item.address}, ${item.city}`}
                  </p>
                </Stack>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Listings;
