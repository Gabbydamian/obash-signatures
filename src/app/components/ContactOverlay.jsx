import { useState } from "react";
import { Link, Image } from "@chakra-ui/react";

const ContactOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black">
      <div className="w-full max-w-5xl mx-auto flex text-white">
        {/* Contact Information */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold">
            KENDRICK GUEHR | CA DRE #01964065
          </h2>
          <p>Phone: (805) 448-4185</p>
          <p>Email: KENDRICK@THEEPSTEINPARTNERS.COM</p>
          <p>Address: 1511 Chapala Street, Santa Barbara CA 93101</p>
          <p>1235 Coast Village Rd Suite F, Montecito CA 93108</p>
          <div className="flex space-x-4 mt-4">
            <Link href="#" isExternal>
              {/* Icons can be added here */}
              Facebook Icon
            </Link>
            <Link href="#" isExternal>
              Instagram Icon
            </Link>
            <Link href="#" isExternal>
              LinkedIn Icon
            </Link>
            <Link href="#" isExternal>
              YouTube Icon
            </Link>
          </div>
        </div>
        {/* Contact Form */}
        <div className="w-1/2 p-8 bg-gray-800">
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className="w-full p-2 mt-2 bg-gray-700 text-white"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="w-full p-2 mt-2 bg-gray-700 text-white"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                className="w-full p-2 mt-2 bg-gray-700 text-white"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                className="w-full p-2 mt-2 bg-gray-700 text-white"
              ></textarea>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 hover:bg-blue-500 text-white"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl"
      >
        &times;
      </button>
    </div>
  );
};

export default ContactOverlay;
