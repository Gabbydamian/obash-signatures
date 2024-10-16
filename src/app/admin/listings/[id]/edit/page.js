"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useListings } from "@/context/ListingsContext";
import ListingForm from "@/app/components/ListingForm";
import baseUrl from "@/utils/getBaseUrl";

const EditListing = () => {
  const { listings, loading } = useListings();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (id && listings.length > 0) {
      const foundListing = listings.find((item) => item.id === id);
      if (foundListing) {
        setInitialData(foundListing);
      }
    }
  }, [listings, id]);

  const handleUpdate = async (listing) => {
    return await fetch(`${baseUrl}/api/listings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listing),
    });
  };

  if (loading || !initialData) return <div>Loading...</div>;

  return (
    <ListingForm
      initialData={initialData}
      onSubmit={handleUpdate}
      isEditMode={true}
    />
  );
};

export default EditListing;
