// app/admin/listings/[id]/page.js

import baseUrl from "../../../../utils/getUrl";
import ListingDetails from "../../../components/ListingDetails";

// This is a server-side function, no `use client` directive here
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

export default function Page({ params }) {
  return <ListingDetails params={params} />;
}
