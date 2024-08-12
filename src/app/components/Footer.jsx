import React from "react";
import { Image, Link, Divider } from "@chakra-ui/react";
import { EnvelopeIcon, PhoneIcon, MapIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="py-12">
      <div className="container mx-auto px-2 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 w-full">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              width={200}
              className="transition-all duration-200 ease-in-out"
            />
          </Link>{" "}
        </div>
        <h2 className="capitalize text-2xl font-semibold text-center mt-8">
          Get in touch
        </h2>
        <div className="contact flex flex-col md:flex-row md:items-center gap-4 uppercase mt-2">
          <div className="email w-full md:w-1/3 flex flex-col items-center gap-2">
            <h6 className="text-2xl flex self-start gap-2">
              {" "}
              <EnvelopeIcon className="size-8" />
              Email
            </h6>
            <Link
              className="underline self-start"
              href="mailto:contact@obashsignatures.com"
            >
              contact@obashsignatures.com
            </Link>
          </div>
          <div className="phone w-full md:w-1/3 flex flex-col md:items-center gap-2">
            <h6 className="text-2xl flex gap-2">
              {" "}
              <PhoneIcon className="size-8" />
              phone
            </h6>
            <Link className="underline" href="tel:8052331232">
              (805) 233-1232
            </Link>
          </div>
          <div className="address w-full md:w-1/3 flex flex-col items-center gap-2">
            <h6 className="text-2xl flex gap-2 self-start">
              {" "}
              <MapIcon className="size-8" />
              address
            </h6>
            <p className="self-start">1511 CHAPALA STREET SANTA BARBARA CA 93101 </p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-black mt-8"></div>
        <p className="self-center text-center">
          &copy; 2024 OBASH SIGNATURES. All rights reserved. Designed by
          <Link href="https://www.github.com/Gabbydamian" className="underline">
            {" "}
            Gabby Damian
          </Link>
        </p>
        <div className="socials flex gap-2 self-center">
          <Link href="#" className="underline">
            Facebook
          </Link>
          <Link href="#" className="underline">
            Twitter
          </Link>
          <Link href="#" className="underline">
            Instagram
          </Link>
          <Link href="#" className="underline">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
