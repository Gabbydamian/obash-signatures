"use client";

import { useState, useEffect } from "react";
import { Input, Button, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { useListings } from "@/context/ListingsContext";
import { useParams, useRouter } from "next/navigation";
import baseUrl from "../../../../../utils/getBaseUrl";

const EditListing = () => {
  const { listings, loading, error } = useListings();
  const [listing, setListing] = useState(null); // Initially null
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const router = useRouter();

  const params = useParams(); // Get the dynamic parameters from URL
  const { id } = params; // Destructure the id from params

  useEffect(() => {
    if (listings.length > 0) {
      const foundListing = listings.find((item) => item.id === id);
      if (foundListing) {
        setListing(foundListing);
      }
    }
  }, [listings, id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing((prev) => ({
      ...prev,
      [name]: value, // Update the listing state with the new values
    }));
  };

  // Handle submit
  const handleSubmit = async () => {
    setLoadingSubmit(true);
    setSubmitError(null);
    try {
      const response = await fetch(`${baseUrl}/api/listings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listing), // Send the updated listing data
      });

      if (!response.ok) {
        throw new Error("Failed to update the listing.");
      }

      const updatedListing = await response.json();
      console.log("Updated data: ", updatedListing);
    } catch (error) {
      console.error("Failed to update the listing.", error);
      setSubmitError("Failed to update the listing.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loading) return <div>Loading listing...</div>;
  if (error) return <div>Error loading listings: {error}</div>;
  if (!listing) return <div>Loading listing...</div>; // Handle case where listing is not loaded yet

  return (
    <div>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            name="address"
            value={listing.address || ""}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>City</FormLabel>
          <Input
            name="city"
            value={listing.city || ""}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input
            name="price"
            value={listing.price || ""}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Details</FormLabel>
          <Input
            name="details"
            value={listing.details || ""}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Image URL</FormLabel>
          <Input
            name="images"
            value={listing.images[0] || ""}
            onChange={(e) =>
              setListing((prev) => ({
                ...prev,
                images: [e.target.value], // Update the images array
              }))
            }
          />
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          isLoading={loadingSubmit}
        >
          Save
        </Button>
        {submitError && <div>{submitError}</div>}
      </Stack>
    </div>
  );
};

export default EditListing;
