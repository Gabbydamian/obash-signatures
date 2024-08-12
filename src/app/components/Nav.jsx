"use client";

import { useState } from "react";
import { Image, IconButton } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import "./nav.css";
import ContactOverlay from "./ContactOverlay"; // Import the Overlay Component

const Nav = () => {
  const [isContactOpen, setContactOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleContactClick = (e) => {
    e.preventDefault();
    setContactOpen(true);
  };

  const handleClose = () => {
    setContactOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const linkClasses = "leading-8 relative nav-link hover:no-underline";
  const logoClasses =
    "hover:scale-[.97] transition-all duration-200 ease-in-out";

  return (
    <>
      <nav className="sticky top-0 z-10 py-8 px-2 md:px-0 min-h-24 backdrop-blur-sm shadow-sm uppercase font-[500]">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              width={200}
              className={logoClasses}
            />
          </Link>
          {/* Hamburger Icon for Mobile */}
          <IconButton
            display={{ base: "block", md: "none" }}
            onClick={toggleMenu}
            icon={isMenuOpen ? <XMarkIcon /> : <Bars3Icon />}
            variant="ghost"
            aria-label="Toggle Navigation"
            fontSize="24px"
            _hover={{ bg: "transparent" }}
          />
          {/* Links for Desktop and Mobile */}
          <ul
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } flex-col md:flex-row md:flex items-center space-y-6 md:space-y-0 md:space-x-12 absolute md:static left-0 top-full bg-white md:bg-transparent w-full md:w-auto z-10 md:z-auto md:py-0 py-4`}
          >
            <li>
              <Link href="/rent" className={linkClasses}>
                For Rent
              </Link>
            </li>
            <li>
              <Link href="/sale" className={linkClasses}>
                For Sale
              </Link>
            </li>
            <li>
              <Link
                href="#"
                onClick={handleContactClick}
                className={linkClasses}
              >
                Contact Us
              </Link>
            </li>
          </ul>
          <Link
            href="tel:8012345678"
            className={`${linkClasses} hidden md:block`}
          >
            (805) 233-1232
          </Link>
        </div>
      </nav>
      <ContactOverlay isOpen={isContactOpen} onClose={handleClose} />
    </>
  );
};

export default Nav;
