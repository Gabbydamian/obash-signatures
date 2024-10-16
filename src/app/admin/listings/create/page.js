"use client";

import ListingForm from "@/app/components/ListingForm";
import baseUrl from "@/utils/getBaseUrl";

const CreateListing = () => {
  const handleCreate = async (listing) => {
    return await fetch(`${baseUrl}/api/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listing),
    });
  };

  return <ListingForm onSubmit={handleCreate} isEditMode={false} />;
};

export default CreateListing;
