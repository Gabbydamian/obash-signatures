import { Image } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import "./nav.css";

const Nav = () => {
  return (
    <nav className="sticky top-0 z-10 py-8 min-h-24 backdrop-blur-sm shadow-sm uppercase font-[500]">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width={200}
            className="hover:scale-[.97] transition-all duration-200 ease-in-out"
          />
        </Link>
        <ul className="flex items-center space-x-12">
          <li>
            <Link
              href="/rent"
              className=" leading-8 relative nav-link hover:no-underline"
            >
              For Rent
            </Link>
          </li>
          <li>
            <Link
              href="/sale"
              className=" leading-8 relative nav-link hover:no-underline"
            >
              For Sale
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className=" leading-8 relative nav-link hover:no-underline"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <Link
          href="tel:8012345678"
          className="leading-6 relative nav-link hover:no-underline"
        >
          (805) 233-1232
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
