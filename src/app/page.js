import { fonts } from "./font";
import Nav from "./components/Nav";
import Main from "./components/Main";
import FeaturedLocations from "./components/FeaturedLocations";
import FeaturesListings from "./components/FeaturesListings";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex min-h-[65vh] md:min-h-[70vh] lg:min-h-[90vh] flex-col">
        <Nav />
        <Main />
      </main>
      <FeaturedLocations />
      <FeaturesListings />
      <Newsletter />
      <Footer />
    </>
  );
}
