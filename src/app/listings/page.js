import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Listings from "./Listings";
import { data } from "./data";

export default function Main() {
  return (
    <>
      {}
      <Nav />
      <Listings data={data} />
      <Footer />
    </>
  );
}
