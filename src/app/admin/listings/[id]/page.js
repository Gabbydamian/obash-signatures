// app/admin/listings/[id]/page.js
"use client";
import ListingDetails from "../../../components/ListingDetails";
import { useListings } from "@/context/ListingsContext";
import { useRouter } from "next/navigation";

const AdminListingPage = ({ params }) => {
  const { listings, loading, error } = useListings();
  const router = useRouter();

  const listingId = params?.id;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading the listings: {error}</div>;
  }

  const listing = listings.find((item) => item.id === listingId);

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return <ListingDetails listing={listing} params={params} />;
};

export default AdminListingPage;
