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
            className="min-h-[350px] filter grayscale-[0.5] hover:no-underline hover:scale-[.99] border rounded-md border-gray-200 hover:filter-none transition-all duration-300 ease-in-out"
          >
            <Card maxW="xs" className="min-h-[350px]">
              <CardBody>
                <Image
                  aspectRatio={3 / 2}
                  fit={"cover"}
                  src={item.images[0]}
                  alt={item.addresss}
                  borderRadius="lg"
                />
                <Stack direction="column" mt={"5"}>
                  <p className="text-lg text-center">
                    {`${item.address}, ${item.city}`}
                  </p>
                  <p className="text-md text-center font-bold">{`${item.price}`}</p>
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
