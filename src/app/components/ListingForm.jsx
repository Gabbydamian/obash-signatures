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
  const [validationErrors, setValidationErrors] = useState({});
  const router = useRouter();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Remove trailing spaces and full stops
  const trimInput = (value) => {
    return value.trim().replace(/\.*$/, ""); // Trim and remove trailing full stops
  };

  // Validate fields
  const validateFields = () => {
    const errors = {};
    const fields = [
      "address",
      "city",
      "price",
      "details",
      "zipCode",
      "type",
      "description",
    ];

    fields.forEach((field) => {
      const value = trimInput(listing[field] || "");
      if (!value) {
        errors[field] = `${field} is required`;
      }
    });

    return errors;
  };

  // Open Cloudinary widget to upload images
  const handleOpenCloudinaryWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Replace with your Cloudinary cloud name
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET, // Set up a preset in Cloudinary
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

    // Perform validation
    const errors = validateFields();
    setValidationErrors(errors);

    // If there are validation errors, prevent form submission
    if (Object.keys(errors).length > 0) {
      setLoadingSubmit(false);
      return;
    }

    // Prepare trimmed form data
    const trimmedListing = {
      ...listing,
      address: trimInput(listing.address),
      city: trimInput(listing.city),
      price: trimInput(listing.price),
      details: trimInput(listing.details),
      zipCode: trimInput(listing.zipCode),
      type: trimInput(listing.type),
      description: trimInput(listing.description),
    };

    try {
      // Use the onSubmit prop to handle the form submission logic (could be POST or PUT)
      await onSubmit(trimmedListing);
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
        <FormControl isInvalid={validationErrors.address}>
          <FormLabel>Address</FormLabel>
          <Input
            name="address"
            value={listing.address || ""}
            onChange={handleChange}
          />
          {validationErrors.address && (
            <div style={{ color: "red" }}>{validationErrors.address}</div>
          )}
        </FormControl>

        <FormControl isInvalid={validationErrors.city}>
          <FormLabel>City</FormLabel>
          <Input
            name="city"
            value={listing.city || ""}
            onChange={handleChange}
          />
          {validationErrors.city && (
            <div style={{ color: "red" }}>{validationErrors.city}</div>
          )}
        </FormControl>

        <FormControl isInvalid={validationErrors.price}>
          <FormLabel>Price</FormLabel>
          <Input
            name="price"
            value={listing.price || ""}
            onChange={handleChange}
          />
          {validationErrors.price && (
            <div style={{ color: "red" }}>{validationErrors.price}</div>
          )}
        </FormControl>

        <FormControl isInvalid={validationErrors.details}>
          <FormLabel>Details</FormLabel>
          <Input
            name="details"
            value={listing.details || ""}
            onChange={handleChange}
          />
          {validationErrors.details && (
            <div style={{ color: "red" }}>{validationErrors.details}</div>
          )}
        </FormControl>

        <FormControl isInvalid={validationErrors.zipCode}>
          <FormLabel>Zip Code</FormLabel>
          <Input
            name="zipCode"
            value={listing.zipCode || ""}
            onChange={handleChange}
          />
          {validationErrors.zipCode && (
            <div style={{ color: "red" }}>{validationErrors.zipCode}</div>
          )}
        </FormControl>

        <FormControl isInvalid={validationErrors.type}>
          <FormLabel>Type</FormLabel>
          <Input
            name="type"
            value={listing.type || ""}
            onChange={handleChange}
          />
          {validationErrors.type && (
            <div style={{ color: "red" }}>{validationErrors.type}</div>
          )}
        </FormControl>

        <FormControl isInvalid={validationErrors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={listing.description || ""}
            onChange={handleChange}
          />
          {validationErrors.description && (
            <div style={{ color: "red" }}>{validationErrors.description}</div>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Upload Images</FormLabel>
          <Button onClick={handleOpenCloudinaryWidget}>Upload Images</Button>
          <Stack spacing={2} direction={"row"} flexWrap={"wrap"}>
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
