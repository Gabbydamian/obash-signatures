import { fonts } from "./font";
import Nav from "./components/Nav";
import Main from "./components/Main";
import FeaturedLocations from "./components/FeaturedLocations";
import FeaturesListings from "./components/FeaturesListings";
export default function Home() {
  return (
    <>
      <main className="flex min-h-[90vh] flex-col">
        <Nav />
        <Main />
      </main>
      <FeaturedLocations />
      <FeaturesListings />
    </>
  );
}
