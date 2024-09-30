"use client";

import { useState, useEffect } from "react";
import { Input, Button, FormControl, FormLabel, Stack } from "@chakra-ui/react";

const EditListing = ({ params }) => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch listing data in useEffect
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`https://obash-api.vercel.app/api/listings/`, {
          method: "GET",
          mode: "no-cors",
        });
        const data = await res.json();

        // Access the listings array from the first object
        const listings = data[0]?.listings || [];
        const foundListing = listings.find((item) => item.id === params.id);

        if (foundListing) {
          setListing(foundListing); // Update the listing state
        } else {
          setError("Listing not found");
        }
      } catch (error) {
        setError("Failed to fetch listing.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.id]); // Fetch data when the component is mounted or when the id changes

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
    try {
      const response = await fetch(
        `https://obash-api.vercel.app/api/listings/${params.id}`,
        {
          method: "PUT",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listing), // Send the updated listing data
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the listing.");
      }

      const updatedListing = await response.json();
      console.log("Updated data: ", updatedListing);
    } catch (error) {
      console.error("Failed to update the listing.", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Edit Listing #{params.id}</h1>
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

        <Button colorScheme="blue" onClick={handleSubmit}>
          Save
        </Button>
      </Stack>
    </div>
  );
};

export default EditListing;
