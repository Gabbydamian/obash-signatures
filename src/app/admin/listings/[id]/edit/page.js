"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Spinner,
  Stack,
} from "@chakra-ui/react";

const EditListing = ({ params }) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listings/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch listing.");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Updated data: ", formData);
    } catch (error) {
      console.error("Failed to update the listing.", error);
    }
  };

  if (loading)
    return (
      <div className="grid place-items-center h-full my-auto">
        <Spinner size="xl" thickness="4px" />
      </div>
    );

  return (
    <div>
      <h1>Edit Listing #{id}</h1>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>City</FormLabel>
          <Input name="city" value={formData.city} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input name="price" value={formData.price} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Details</FormLabel>
          <Input
            name="details"
            value={formData.details}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Image URL</FormLabel>
          <Input
            name="images"
            value={formData.images[0]}
            onChange={(e) =>
              setFormData({ ...formData, images: [e.target.value] })
            }
          />
        </FormControl>

        <Button colorScheme="blue" onClick={handleSubmit}>
          Save
        </Button>
      </Stack>
    </div>
  );
};

export default EditListing;
