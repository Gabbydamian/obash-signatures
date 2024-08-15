import { data } from "../data";
import Nav from "../../components/Nav";
import Listing from "./Listing";

export async function generateStaticParams() {
  const paths = data.map((_, index) => ({
    id: index.toString(),
  }));

  return paths.map((param) => ({
    params: param,
  }));
}

const ListingPage = async ({ params }) => {
  const listing = data[parseInt(params.id, 10)];

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <>
      <Nav />
      {!listing ? <div>Listing not found</div> : <Listing listing={listing} />}
    </>
  );
};

export default ListingPage;
