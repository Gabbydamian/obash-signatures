import Nav from "../../components/Nav";
import Listing from "./Listing";
import baseUrl from "../../../utils/getUrl";

export async function generateStaticParams() {
  const res = await fetch(`${baseUrl}/api/listings`);
  const data = await res.json();

  // Assuming data[0].listings is where the listings are stored
  const paths = data[0]?.listings?.map((listing) => ({
    id: listing.id, // Use the id inside the listings array
  }));

  return paths.map((param) => ({
    params: param,
  }));
}

const ListingPage = async ({ params }) => {
  try {
    const res = await fetch(`${baseUrl}/api/listings`);
    const data = await res.json();

    // Accessing the listings from the first object
    const listings = data[0]?.listings || [];
    const listing = listings.find((item) => item.id === params.id); // Find listing by ID

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
