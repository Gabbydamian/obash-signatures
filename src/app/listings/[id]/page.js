"use client";
import Nav from "../../components/Nav";
import Listing from "./Listing";
import { useListings } from "@/context/ListingsContext";
import { useRouter } from "next/navigation"; // Updated based on your preference

const ListingPage = ({ params }) => {
  const { listings, loading, error } = useListings();
  const router = useRouter();

  // Access the dynamic `id` from `params`
  const listingId = params?.id;

  if (loading) {
    return (
      <div>
        <Nav />
      </div>
    );
  }

  if (error) {
    return <div>Error loading the listings: {error}</div>;
  }

  // Find the listing by the dynamic `id`
  const listing = listings.find((item) => item.id === listingId);

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <>
      <Nav />
      <Listing listing={listing} />
    </>
  );
};

export default ListingPage;
