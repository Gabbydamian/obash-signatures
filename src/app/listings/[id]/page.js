import Nav from "../../components/Nav";
import Listing from "./Listing";

// Helper function to determine base URL
const getBaseUrl = () => {
  // Check if running in production or development
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_PRODUCTION_URL; // Set this in your .env file for production
};

// Fetch data from the API during build time to generate static paths
export async function generateStaticParams() {
  const baseUrl = getBaseUrl(); // Dynamically get the base URL
  const res = await fetch(`${baseUrl}/api/listings`);
  const data = await res.json();

  // Assuming data[0].listings is the new structure for listings
  const paths =
    data[0]?.listings?.map((_, index) => ({
      id: index.toString(),
    })) || [];

  return paths.map((param) => ({
    params: param,
  }));
}

const ListingPage = async ({ params }) => {
  try {
    const baseUrl = getBaseUrl(); // Dynamically get the base URL
    const res = await fetch(`${baseUrl}/api/listings`);
    const data = await res.json();

    // Assuming data[0].listings is the new structure for listings
    const listings = data[0]?.listings || [];
    const listing = listings[parseInt(params.id, 10)];

    if (!listing) {
      return <div>Listing not found</div>;
    }

    return (
      <>
        <Nav />
        <Listing listing={listing} />
      </>
    );
  } catch (error) {
    console.error("Error fetching listing:", error);
    return <div>Error loading the listing</div>;
  }
};

export default ListingPage;
