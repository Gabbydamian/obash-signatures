"use client";

import { useState } from "react";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const ListingForm = ({ initialData, onSubmit, isEditMode }) => {
  const [listing, setListing] = useState(
    initialData || {
      address: "",
      city: "",
      price: "",
      details: "",
      zipCode: "",
      type: "",
      description: "",
      images: [], // Cloudinary URLs will be stored here
    }
  );
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const router = useRouter();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open Cloudinary widget to upload images
  const handleOpenCloudinaryWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dmp14vlak", // Replace with your Cloudinary cloud name
        uploadPreset: "Obash-uploads", // Set up a preset in Cloudinary
        sources: ["local", "url"],
        multiple: true,
        resourceType: "image",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setListing((prev) => ({
            ...prev,
            images: [...prev.images, result.info.secure_url],
          }));
        }
      }
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoadingSubmit(true);
    setSubmitError(null);

    try {
      // Use the onSubmit prop to handle the form submission logic (could be POST or PUT)
      await onSubmit(listing);
      router.push(`/admin/listings`);
    } catch (error) {
      console.error(error);
      setSubmitError(
        isEditMode
          ? "Failed to update the listing."
          : "Failed to create the listing."
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div>
      <Stack spacing={4}>
        {/* Form fields */}
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
          <FormLabel>Zip Code</FormLabel>
          <Input
            name="zipCode"
            value={listing.zipCode || ""}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Type</FormLabel>
          <Input
            name="type"
            value={listing.type || ""}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={listing.description || ""}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Upload Images</FormLabel>
          <Button onClick={handleOpenCloudinaryWidget}>Upload Images</Button>
          <Stack spacing={2}>
            {listing.images.map((url, idx) => (
              <img key={idx} src={url} alt={`Uploaded ${idx}`} width="200" />
            ))}
          </Stack>
        </FormControl>

        {/* Submit button */}
        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          isLoading={loadingSubmit}
        >
          {isEditMode ? "Update" : "Create"}
        </Button>
        {submitError && <div>{submitError}</div>}
      </Stack>
    </div>
  );
};

export default ListingForm;
