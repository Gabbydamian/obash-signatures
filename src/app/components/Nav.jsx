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
      <nav className="sticky top-0 z-10 py-8 px-6 md:px-12 xl:px-16 min-h-24 backdrop-blur-sm shadow-sm uppercase font-[500]">
        <div className="container px-4 md:px-0 mx-auto flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo-black.svg"
              alt="logo"
              width={120}
              className={`${logoClasses} block md:hidden`}
            />
            <Image
              src="/logo-black.svg"
              alt="logo"
              width={160}
              className={`${logoClasses} hidden md:block`}
            />
          </Link>
          {/* Hamburger Icon for Mobile */}
          <IconButton
            display={{ base: "block", lg: "none" }}
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
            } flex-col lg:flex-row lg:flex items-center space-y-10 lg:space-y-0 lg:space-x-12 absolute lg:static left-0 top-full bg-white lg:bg-transparent w-full lg:w-auto z-10 lg:z-auto lg:py-0 py-8`}
          >
            <li>
              <Link href="/listings" className={linkClasses}>
                Properties
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
            href="tel:8074145068"
            className={`${linkClasses} hidden lg:block`}
          >
            (234) 807 414 5068
          </Link>
        </div>
      </nav>
      <ContactOverlay isOpen={isContactOpen} onClose={handleClose} />
    </>
  );
};

export default Nav;
