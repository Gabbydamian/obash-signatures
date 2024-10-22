import React from "react";
import { Image, Link } from "@chakra-ui/react";
import { EnvelopeIcon, PhoneIcon, MapIcon } from "@heroicons/react/24/outline";

const ContactInfo = ({ icon: Icon, label, content, href }) => {
  return (
    <div className="w-full md:w-1/3 flex flex-col items-center gap-2">
      <h6 className="text-2xl flex gap-2 self-start">
        <Icon className="size-8" />
        {label}
      </h6>
      {href ? (
        <Link href={href} className="underline self-start">
          {content}
        </Link>
      ) : (
        <p className="self-start">{content}</p>
      )}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="py-12">
      <div className="container mx-auto px-2 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 w-full">
          <Link href="/">
            <Image
              src="/logo-black.svg"
              alt="logo"
              width={180}
              className="transition-all duration-200 ease-in-out"
            />
          </Link>
        </div>
        <h2 className="capitalize text-2xl font-semibold text-center mt-2">
          Get in touch
        </h2>
        <div className="contact flex flex-col md:flex-row md:items-center gap-4 uppercase mt-2">
          <ContactInfo
            icon={EnvelopeIcon}
            label="Email"
            content="contact@obashsignatures.com"
            href="mailto:contact@obashsignatures.com"
          />
          <ContactInfo
            icon={PhoneIcon}
            label="Phone"
            content="(234) 807 414 5068"
            href="tel:8074145068"
          />
          <ContactInfo
            icon={MapIcon}
            label="Address"
            content="1511 CHAPALA STREET SANTA BARBARA CA 93101"
          />
        </div>
        <div className="w-full h-[1px] bg-black mt-8"></div>
        <p className="self-center text-center">
          &copy; 2024 OBASH SIGNATURES. All rights reserved. Designed by{" "}
          <Link
            href="https://www.github.com/Gabbydamian"
            target="__blank"
            className="underline"
          >
            Gabby Damian
          </Link>
        </p>
        <div className="socials flex gap-2 self-center">
          <Link href="https://facebook.com" className="underline">
            Facebook
          </Link>
          <Link href="https://x.com" className="underline">
            Twitter
          </Link>
          <Link href="https://instagram.com" className="underline">
            Instagram
          </Link>
          <Link href="https://linkedin.com" className="underline">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
