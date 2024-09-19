"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  Image,
  Button,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Pencil } from "lucide-react";

const AdminListingCard = ({ item, idx }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/admin/listings/${item.id}/edit`); // Navigate to the edit page
  };

  const handleOpenListing = () => {
    router.push(`/admin/listings/${item.id}`); // Navigate to the listing page
  };

  const handleDelete = () => {
    fetch(`http://localhost:3001/listings/${item.id}`, {
      method: "DELETE",
    }).then(() => {
      router.refresh();
    });
  };

  return (
    <>
      <ChakraLink
        key={idx}
        onClick={handleOpenListing} // Navigate to the edit page
        className="min-h-[290px] hover:no-underline rounded-md"
      >
        <Card
          maxW="200px"
          className="min-h-[290px] shadow-none border-gray-200 border hover:border-blue-300 transition-all"
        >
          <CardBody className="flex flex-col items-center justify-between">
            <Image
              aspectRatio={3 / 2}
              fit={"cover"}
              src={item.images[0]}
              alt={item.address}
              borderRadius="lg"
            />
            <Stack direction="column" mt={"2"}>
              <p className="text-sm text-center font-bold">{`${item.type}, ${item.details}`}</p>
              <p className="text-sm text-center">{`${item.address}, ${item.city}`}</p>
              <div className="flex items-center gap-4 justify-center">
                <Button
                  size={"sm"}
                  colorScheme={"teal"}
                  onClick={handleEditClick} // Navigate to the edit page
                >
                  <PencilSquareIcon /> Edit
                </Button>
                <Button size={"sm"} colorScheme={"red"} onClick={handleDelete}>
                  <TrashIcon /> Delete
                </Button>
              </div>
            </Stack>
          </CardBody>
        </Card>
      </ChakraLink>
    </>
  );
};

export default AdminListingCard;
