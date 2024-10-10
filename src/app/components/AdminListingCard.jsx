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
import baseUrl from "@/utils/getBaseUrl";

const AdminListingCard = ({ item, idx }) => {
  const router = useRouter();

  // Navigate to the listing details page
  const handleOpenListing = () => {
    router.push(`/admin/listings/${item.id}`);
  };

  // Navigate to the edit page
  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent the card click from triggering
    router.push(`/admin/listings/${item.id}/edit`);
  };

  // Handle the delete action
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent the card click from triggering
    fetch(`${baseUrl}/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      router.refresh(); // Refresh the page after deletion
    });
  };

  return (
    <Card
      maxW="200px"
      className="min-h-[290px] shadow-none border-gray-200 border hover:border-blue-300 transition-all cursor-pointer"
      onClick={handleOpenListing} // Navigate to the listing details page
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
              size={"xs"}
              colorScheme={"teal"}
              className="flex items-center justify-center gap-1 text-xs p-2"
              onClick={handleEditClick} // Prevent propagation and handle the edit click
            >
              <PencilSquareIcon className="size-4" /> Edit
            </Button>
            <Button
              size={"xs"}
              colorScheme={"red"}
              className="flex items-center justify-center gap-1 text-xs p-2"
              onClick={handleDelete} // Prevent propagation and handle the delete click
            >
              <TrashIcon className="size-4" /> Delete
            </Button>
          </div>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default AdminListingCard;
